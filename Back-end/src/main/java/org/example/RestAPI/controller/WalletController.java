package org.example.RestAPI.controller;

import org.example.RestAPI.finalstring.FinalMessage;
import org.example.RestAPI.importer.WalletExcelImporter;
import org.example.RestAPI.model.Message;
import org.example.RestAPI.model.User;
import org.example.RestAPI.model.Wallet;
import org.example.RestAPI.request.wallet.CheckValidWalletRequest;
import org.example.RestAPI.request.wallet.CreateWalletRequest;
import org.example.RestAPI.request.wallet.DeleteWalletRequest;
import org.example.RestAPI.request.wallet.UpdateWalletRequest;
import org.example.RestAPI.response.importer.WalletExcelImporterResponse;
import org.example.RestAPI.response.wallet.CreateWalletResponse;
import org.example.RestAPI.response.wallet.DeleteWalletResponse;
import org.example.RestAPI.response.wallet.GetListWalletResponse;
import org.example.RestAPI.response.wallet.UpdateWalletResponse;
import org.example.RestAPI.service.IUserService;
import org.example.RestAPI.service.IWalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/wallet")
public class WalletController {
    @Autowired
    IUserService userService;

    @Autowired
    IWalletService walletService;

    @PostMapping("/create")
    public ResponseEntity createWallet(@RequestBody CreateWalletRequest request){
        try{
            CheckValidWalletRequest.checkCreateWalletRequest(request);
            Optional<User> findUser = userService.findById(request.getUser_id());
            Message<CreateWalletResponse> message;
            if (findUser.isEmpty()){
                message = new Message<>(FinalMessage.NO_USER, null);
            }
            else{
                if (!request.getResult().equals("OK")){
                    message = new Message<>(request.getResult(), null);
                    return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
                }
                else{
                    Wallet wallet = new Wallet();
                    wallet.setWallet_name(request.getWallet_name());

                    findUser.get().addWallet(wallet);

                    walletService.addWallet(wallet);

                    message = new Message<>(FinalMessage.CREATE_WALLET_SUCCESS,
                            new CreateWalletResponse(wallet.getId()));
                }
            }
            return new ResponseEntity(message, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public ResponseEntity updateWallet(@RequestBody UpdateWalletRequest request){
        try{
            CheckValidWalletRequest.checkUpdateWalletRequest(request);
            Optional<Wallet> findWallet = walletService.findById(request.getWallet_id());
            Message<UpdateWalletResponse> message;

            if (findWallet.isEmpty()){
                message = new Message<>(FinalMessage.NO_WALLET, null);
            }
            else{
                if (!request.getResult().equals("OK")){
                    message = new Message<>(request.getResult(), null);
                    return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
                }
                else{
                    Wallet wallet = findWallet.get();
                    wallet.setWallet_name(request.getWallet_name());
                    walletService.addWallet(wallet);

                    message = new Message<>(FinalMessage.CHANGE_WALLET_NAME_SUCCESS,
                            new UpdateWalletResponse(wallet.getId(), wallet.getWallet_name(),
                                    wallet.getCreated_date(), wallet.getModified_date(), wallet.getTotal_amount()));
                }
            }
            return new ResponseEntity(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/list")
    public ResponseEntity getListWallet(@RequestParam(name = "userId") long user_id){
        try{
            Optional<User> findUser = userService.findById(user_id);
            Message<GetListWalletResponse> message;

            if (findUser.isEmpty()){
                message = new Message<>(FinalMessage.NO_USER, null);
            }
            else{
                GetListWalletResponse response = new GetListWalletResponse(findUser.get());
                message = new Message<>(FinalMessage.GET_LIST_WALLET_SUCCESS, response);
            }
            return new ResponseEntity(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity deleteWallet(@RequestBody DeleteWalletRequest request){
        try{
            Optional<Wallet> findWallet = walletService.findById(request.getWallet_id());
            Message<DeleteWalletResponse> message;

            if(findWallet.isEmpty()){
                message = new Message<>(FinalMessage.NO_WALLET, null);
            }
            else{
                walletService.deleteWallet(request.getWallet_id());

                message = new Message<>(FinalMessage.DELETE_WALLET_SUCCESS, new DeleteWalletResponse(
                        request.getWallet_id()));
            }
            return new ResponseEntity(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/export/excel")
    public ResponseEntity getFile(){
        try{
            String filename = "wallet.xlsx";
            InputStreamResource file = new InputStreamResource(walletService.load());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                    .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                    .body(file);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/import/excel")
    public ResponseEntity uploadFile(@RequestParam("file") MultipartFile file) {
        try{
            if (WalletExcelImporter.hasExcelFormat(file)) {
                try {
                    walletService.save(file);
                    return ResponseEntity.status(HttpStatus.OK).body(new WalletExcelImporterResponse(FinalMessage.IMPORT_EXCEL_FILE_SUCCESS));
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new WalletExcelImporterResponse(FinalMessage.IMPORT_EXCEL_FILE_FAIL));
                }
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new WalletExcelImporterResponse(FinalMessage.NOT_EXCEL_FILE));
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
