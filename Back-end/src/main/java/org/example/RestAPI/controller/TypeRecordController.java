package org.example.RestAPI.controller;

import org.example.RestAPI.finalstring.FinalMessage;
import org.example.RestAPI.model.Message;
import org.example.RestAPI.model.TypeRecord;
import org.example.RestAPI.model.Wallet;
import org.example.RestAPI.request.typerecord.CheckValidTypeRecordRequest;
import org.example.RestAPI.request.typerecord.CreateTypeRecordRequest;
import org.example.RestAPI.request.typerecord.DeleteTypeRecordRequest;
import org.example.RestAPI.request.typerecord.UpdateTypeRecordRequest;
import org.example.RestAPI.response.record.GetListRecordResponse;
import org.example.RestAPI.response.typerecord.CreateTypeRecordResponse;
import org.example.RestAPI.response.typerecord.DeleteTypeRecordResponse;
import org.example.RestAPI.response.typerecord.GetListTypeRecordResponse;
import org.example.RestAPI.response.typerecord.UpdateTypeRecordResponse;
import org.example.RestAPI.service.ITypeRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/typeRecord")
public class TypeRecordController {
    @Autowired
    ITypeRecordService typeRecordService;


    @GetMapping("/list")
    public ResponseEntity getListRecord(){
        try{
            Message<GetListTypeRecordResponse> message;
            List<TypeRecord> listTypeRecord = typeRecordService.getAll();
            if (listTypeRecord.isEmpty()){
                message = new Message<>(FinalMessage.NO_TYPE_RECORD, null);
            }
            else{
                GetListTypeRecordResponse response = new GetListTypeRecordResponse(listTypeRecord);
                message = new Message<>(FinalMessage.GET_LIST_TYPE_RECORD_SUCCESS, response);
            }

            return new ResponseEntity(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/create")
    public ResponseEntity createTypeRecord(@RequestBody CreateTypeRecordRequest request){
        try{
            CheckValidTypeRecordRequest.checkCreateTypeRecordRequest(request);
            Optional<TypeRecord> findTypeRecord = typeRecordService.findByTypeRecord_name(request.getTypeRecord_name());
            Message<CreateTypeRecordResponse> message;

            if (findTypeRecord.isEmpty()){
                if (!request.getResult().equals("OK")){
                    message = new Message<>(request.getResult(), null);
                    return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
                }
                else{
                    TypeRecord typeRecord = new TypeRecord();
                    typeRecord.setTypeRecord_name(request.getTypeRecord_name());
                    typeRecord.setImage_url(request.getImage_url());

                    typeRecordService.addTypeRecord(typeRecord);

                    message = new Message<>(FinalMessage.CREATE_TYPE_RECORD_SUCCESS, new CreateTypeRecordResponse(
                            typeRecord.getId()));
                }
            }
            else{
                message = new Message<>(FinalMessage.TYPE_RECORD_EXISTED, null);
            }
            return new ResponseEntity(message, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public ResponseEntity updateTypeRecord(@RequestBody UpdateTypeRecordRequest request){
        try{
            CheckValidTypeRecordRequest.checkUpdateTypeRecordRequest(request);
            Optional<TypeRecord> findTypeRecord = typeRecordService.findById(request.getTypeRecord_id());
            Message<UpdateTypeRecordResponse> message;

            if (findTypeRecord.isEmpty()){
                message = new Message<>(FinalMessage.NO_TYPE_RECORD, null);
            }
            else{
                if (!request.getResult().equals("OK")){
                    message = new Message<>(request.getResult(), null);
                    return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
                }
                else{
                    TypeRecord typeRecord = findTypeRecord.get();
                    typeRecord.setTypeRecord_name(request.getTypeRecord_name());
                    typeRecord.setImage_url(request.getImage_url());

                    typeRecordService.addTypeRecord(typeRecord);

                    message = new Message<>(FinalMessage.UPDATE_TYPE_RECORD_SUCCESS, new UpdateTypeRecordResponse(
                            typeRecord.getId(), typeRecord.getTypeRecord_name(), typeRecord.getImage_url()
                    ));
                }
            }
            return new ResponseEntity(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/delete")
    public ResponseEntity deleteTypeRecord(@RequestBody DeleteTypeRecordRequest request){
        try{
            Optional<TypeRecord> findTypeRecord = typeRecordService.findById(request.getTypeRecord_id());
            Message<DeleteTypeRecordResponse> message;

            if (findTypeRecord.isEmpty()){
                message = new Message<>(FinalMessage.NO_TYPE_RECORD, null);
            }
            else{
                TypeRecord typeRecord = findTypeRecord.get();
                if (typeRecord.getListRecord().size() != 0 || typeRecord.getListWallet().size() != 0){
                    message = new Message<>(FinalMessage.UNABLE_TO_DELETE_TYPE_RECORD, null);
                }
                else{
                    typeRecordService.deleteTypeRecord(typeRecord);

                    message = new Message<>(FinalMessage.DELETE_TYPE_RECORD_SUCCESS, new DeleteTypeRecordResponse(
                            request.getTypeRecord_id()
                    ));
                }
            }
            return new ResponseEntity(message, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/export/excel")
    public ResponseEntity getFile(){
        try{
            String filename = "typeRecord.xlsx";
            InputStreamResource file = new InputStreamResource(typeRecordService.loadTypeRecord());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                    .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                    .body(file);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
