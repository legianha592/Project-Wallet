package org.example.RestAPI.controller;

import org.example.RestAPI.finalstring.FinalMessage;
import org.example.RestAPI.model.Record;
import org.example.RestAPI.model.*;
import org.example.RestAPI.request.record.CheckValidRecordRequest;
import org.example.RestAPI.request.record.CreateRecordRequest;
import org.example.RestAPI.request.record.DeleteRecordRequest;
import org.example.RestAPI.request.record.UpdateRecordRequest;
import org.example.RestAPI.response.record.CreateRecordResponse;
import org.example.RestAPI.response.record.DeleteRecordResponse;
import org.example.RestAPI.response.record.GetListRecordResponse;
import org.example.RestAPI.response.record.UpdateRecordResponse;
import org.example.RestAPI.service.IRecordService;
import org.example.RestAPI.service.ITypeRecordService;
import org.example.RestAPI.service.IUserService;
import org.example.RestAPI.service.IWalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/record")
public class RecordController {
    @Autowired
    IWalletService walletService;

    @Autowired
    IUserService userService;

    @Autowired
    IRecordService recordService;

    @Autowired
    ITypeRecordService typeRecordService;

    @PostMapping("/create")
    public ResponseEntity createRecord(@RequestBody CreateRecordRequest request){
        try{
            CheckValidRecordRequest.checkCreateRecordRequest(request);
            Optional<Wallet> findWallet = walletService.findById(request.getWallet_id());
            Optional<TypeRecord> findTypeRecord = typeRecordService.findById(request.getTypeRecord_id());
            Message<CreateRecordResponse> message;

            if (findWallet.isEmpty()){
                message = new Message<>(FinalMessage.NO_WALLET, null);
            }
            else if(findTypeRecord.isEmpty()){
                message = new Message<>(FinalMessage.NO_TYPE_RECORD, null);
            }
            else{
                if (!request.getResult().equals("OK")){
                    message = new Message<>(request.getResult(), null);
                    return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
                }
                else{
                    //T???o ?????i t?????ng record m???i + l???y type record t??? db
                    Record record = new Record();
                    TypeRecord typeRecord = findTypeRecord.get();

                    //setup th??ng tin ph??a record
                    record.setTitle(request.getTitle());
                    record.setNote(request.getNote());
                    record.setAmount(request.getAmount());
                    record.setRecord_date(request.getRecord_date());
                    record.setTypeRecord(typeRecord);

                    //setup ph??a type record: 1 type record g???m nhi???u record, nhi???u wallet
                    typeRecord.addRecord(record);
                    typeRecord.addWallet(findWallet.get());

                    //setup ph??a wallet: 1 wallet g???m nhi???u record, nhi???u type record
                    findWallet.get().addRecord(record);
                    findWallet.get().addTypeRecord(typeRecord);

                    //sau khi add record c???n c???p nh???t ngay total amount c???a v?? t???i db
                    recordService.addRecord(record);
                    walletService.updateWallet(request.getWallet_id(), record.getAmount());

                    message = new Message<>(FinalMessage.CREATE_RECORD_SUCCESS, new CreateRecordResponse(
                            record.getId(), request.getWallet_id(), request.getTypeRecord_id()));
                }
            }
            return new ResponseEntity(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public ResponseEntity updateRecord(@RequestBody UpdateRecordRequest request){
        try{
            CheckValidRecordRequest.checkUpdateRecordRequest(request);
            Optional<Record> findRecord = recordService.findById(request.getRecord_id());
            Optional<TypeRecord> findTypeRecord = typeRecordService.findById(request.getTypeRecord_id());
            Message<UpdateRecordResponse> message;

            if (findRecord.isEmpty()){
                message = new Message<>(FinalMessage.NO_RECORD, null);
            }
            else if (findTypeRecord.isEmpty()){
                message = new Message<>(FinalMessage.NO_TYPE_RECORD, null);
            }
            else{
                if (!request.getResult().equals("OK")) {
                    message = new Message<>(request.getResult(), null);
                    return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
                }
                else{
                    //l???y record c???n s???a + v?? ch??? qu???n ????? s???a amount c???a v??
                    Record record = findRecord.get();
                    Wallet wallet = record.getWallet();
                    TypeRecord typeRecord = record.getTypeRecord();

                    //C??c th??ng s??? quan tr???ng c?? th??? update: total_amount c???a v?? ch??? + m???i li??n h??? wallet - typeRecord
                    double delta = request.getAmount() - record.getAmount();
                    record.setTitle(request.getTitle());
                    record.setNote(request.getNote());
                    record.setAmount(request.getAmount());
                    record.setRecord_date(request.getRecord_date());
                    record.setTypeRecord(findTypeRecord.get());

                    //setup ph??a type record: 1 type record g???m nhi???u record, nhi???u wallet
                    findTypeRecord.get().addWallet(wallet);

                    //setup ph??a wallet: 1 wallet g???m nhi???u record, nhi???u type record
                    wallet.addTypeRecord(findTypeRecord.get());

                    //B1: Vi co record moi
                    recordService.addRecord(record);
                    //B2: Vi cap nhat lai total_amount
                    walletService.updateWallet(wallet.getId(), delta);


                    message = new Message<>(FinalMessage.UPDATE_RECORD_SUCCESS, new UpdateRecordResponse(
                            record.getId(), record.getTitle(), record.getNote(), record.getAmount(), record.getRecord_date(),
                            wallet.getId(), request.getTypeRecord_id()
                    ));
                }
            }
            return new ResponseEntity(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/list")
    public ResponseEntity getListRecord(@RequestParam(name = "walletId") long wallet_id){
        try{
            Optional<Wallet> findWallet = walletService.findById(wallet_id);
            Message<GetListRecordResponse> message;

            if (findWallet.isEmpty()){
                message = new Message<>(FinalMessage.NO_WALLET, null);
            }
            else{
                GetListRecordResponse response = new GetListRecordResponse(findWallet.get());
                message = new Message<>(FinalMessage.GET_LIST_RECORD_SUCCESS, response);
            }
            return new ResponseEntity(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listByUserId")
    public ResponseEntity getListRecordByUserId(@RequestParam(name = "userId") long user_id){
        try{
            Optional<User> findUser = userService.findById(user_id);
            Message<GetListRecordResponse> message;

            if (findUser.isEmpty()){
                message = new Message<>(FinalMessage.NO_USER, null);
            }
            else{
                GetListRecordResponse response = new GetListRecordResponse(findUser.get());
                message = new Message<>(FinalMessage.GET_LIST_RECORD_SUCCESS, response);
            }

            return new ResponseEntity(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteRecord(@RequestBody DeleteRecordRequest request){
        try{
            Optional<Record> findRecord = recordService.findById(request.getRecord_id());
            Message<DeleteRecordResponse> message;

            if (findRecord.isEmpty()){
                message = new Message<>(FinalMessage.NO_RECORD, null);
            }
            else{
                Record record = findRecord.get();
                Wallet wallet = record.getWallet();

                double delta = record.getAmount();

                recordService.deleteRecord(record);
                walletService.updateWallet(wallet.getId(), -delta);

                message = new Message<>(FinalMessage.DELETE_RECORD_SUCCESS, new DeleteRecordResponse(
                        request.getRecord_id()));
            }
            return new ResponseEntity(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
