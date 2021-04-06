package org.example.RestAPI.controller;

import org.example.RestAPI.finalstring.FinalMessage;
import org.example.RestAPI.model.Message;
import org.example.RestAPI.model.Record;
import org.example.RestAPI.model.TypeRecord;
import org.example.RestAPI.model.Wallet;
import org.example.RestAPI.request.record.CreateRecordRequest;
import org.example.RestAPI.request.record.DeleteRecordRequest;
import org.example.RestAPI.request.record.UpdateRecordRequest;
import org.example.RestAPI.response.record.CreateRecordResponse;
import org.example.RestAPI.response.record.DeleteRecordResponse;
import org.example.RestAPI.response.record.GetListRecordResponse;
import org.example.RestAPI.response.record.UpdateRecordResponse;
import org.example.RestAPI.service.IRecordService;
import org.example.RestAPI.service.ITypeRecordService;
import org.example.RestAPI.service.IWalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/record")
public class RecordController {
    @Autowired
    IWalletService walletService;

    @Autowired
    IRecordService recordService;

    @Autowired
    ITypeRecordService typeRecordService;

    @PostMapping("/create")
    public ResponseEntity createRecord(@RequestBody CreateRecordRequest request){
        Optional<Wallet> findWallet = walletService.findById(request.getWallet_id());
        Optional<TypeRecord> findTypeRecord = typeRecordService.findById(request.getTypeRecord_id());
        Message<CreateRecordResponse> message;

        if (findWallet.isEmpty()){
            message = new Message<>(FinalMessage.NO_WALLET, null);
        }
        else if(findTypeRecord.isEmpty()){
            message = new Message<>(FinalMessage.NO_TYPERECORD, null);
        }
        else{
            if (!request.getResult().equals("OK")){
                message = new Message<>(request.getResult(), null);
            }
            else{
                //Tạo đối tượng record mới + lấy type record từ db
                Record record = new Record();
                TypeRecord typeRecord = findTypeRecord.get();

                //setup thông tin phía record
                record.setTitle(request.getTitle());
                record.setNote(request.getNote());
                record.setAmount(request.getAmount());
                record.setTypeRecord(typeRecord);

                //setup phía type record: 1 type record gồm nhiều record, nhiều wallet
                typeRecord.addRecord(record);
                typeRecord.addWallet(findWallet.get());

                //setup phía wallet: 1 wallet gồm nhiều record, nhiều type record
                findWallet.get().addRecord(record);
                findWallet.get().addTypeRecord(typeRecord);

                //sau khi add record cần cập nhật ngay total amount của ví tại db
                recordService.addRecord(record);
                walletService.updateWallet(request.getWallet_id(), record.getAmount());

                message = new Message<>(FinalMessage.CREATE_RECORD_SUCCESS, new CreateRecordResponse(
                       record.getId(), request.getWallet_id(), request.getTypeRecord_id()));
            }
        }
        return new ResponseEntity<Message<CreateRecordResponse>>(message, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity updateRecord(@RequestBody UpdateRecordRequest request){
        Optional<Record> findRecord = recordService.findById(request.getRecord_id());
        Optional<TypeRecord> findTypeRecord = typeRecordService.findById(request.getTypeRecord_id());
        Message<UpdateRecordResponse> message;

        if (findRecord.isEmpty()){
            message = new Message<>(FinalMessage.NO_RECORD, null);
        }
        else if (findTypeRecord.isEmpty()){
            message = new Message<>(FinalMessage.NO_TYPERECORD, null);
        }
        else{
            if (!request.getResult().equals("OK")) {
                message = new Message<>(request.getResult(), null);
            }
            else{
                //lấy record cần sửa + ví chủ quản để sửa amount của ví
                Record record = findRecord.get();
                Wallet wallet = record.getWallet();
                TypeRecord typeRecord = record.getTypeRecord();

                //Các thông số quan trọng có thể update: total_amount của ví chủ + mối liên hệ wallet - typeRecord
                double delta = request.getAmount() - record.getAmount();
                record.setTitle(request.getTitle());
                record.setNote(request.getNote());
                record.setAmount(request.getAmount());
                record.setTypeRecord(findTypeRecord.get());

                //setup phía type record: 1 type record gồm nhiều record, nhiều wallet
                findTypeRecord.get().addWallet(wallet);

                //setup phía wallet: 1 wallet gồm nhiều record, nhiều type record
                wallet.addTypeRecord(findTypeRecord.get());

                //B1: Vi co record moi
                recordService.addRecord(record);
                //B2: Vi cap nhat lai total_amount
                walletService.updateWallet(wallet.getId(), delta);


                message = new Message<>(FinalMessage.UPDATE_RECORD_SUCCESS, new UpdateRecordResponse(
                        record.getId(), record.getTitle(), record.getNote(), record.getAmount(), wallet.getId(), request.getTypeRecord_id()
                ));
            }
        }
        return new ResponseEntity<Message<UpdateRecordResponse>>(message, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity getListRecord(@RequestParam(name = "walletId") long wallet_id){
        Optional<Wallet> findWallet = walletService.findById(wallet_id);
        Message<GetListRecordResponse> message;

        if (findWallet.isEmpty()){
            message = new Message<>(FinalMessage.NO_WALLET, null);
        }
        else{
            GetListRecordResponse response = new GetListRecordResponse(findWallet.get());
            message = new Message<>(FinalMessage.GET_LIST_RECORD_SUCCESS, response);
        }

        return new ResponseEntity<Message<GetListRecordResponse>>(message, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteRecord(@RequestBody DeleteRecordRequest request){
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

        return new ResponseEntity<Message<DeleteRecordResponse>>(message, HttpStatus.OK);
    }
}
