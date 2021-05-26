package org.example.RestAPI.request.typerecord;

import org.example.RestAPI.finalstring.FinalMessage;
import org.example.RestAPI.request.typerecord.CreateTypeRecordRequest;
import org.example.RestAPI.request.typerecord.UpdateTypeRecordRequest;

public class CheckValidTypeRecordRequest {
    public static void checkCreateTypeRecordRequest(CreateTypeRecordRequest request){
        int MAX_LENGTH = 50;
        String typeRecord_name = request.getTypeRecord_name();
        String image_url = request.getImage_url();

        if (typeRecord_name == null || image_url == null){
            request.setResult(FinalMessage.MANDATORY_FIELD_IS_EMPTY);
            return;
        }
        if (typeRecord_name.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_TYPE_RECORD_NAME_LENGTH);
            return;
        }
        request.setResult("OK");
    }

    public static void checkUpdateTypeRecordRequest(UpdateTypeRecordRequest request){
        int MAX_LENGTH = 50;
        Long typeRecord_id = request.getTypeRecord_id();
        String typeRecord_name = request.getTypeRecord_name();
        String image_url = request.getImage_url();

        if (typeRecord_id == null || typeRecord_name == null || image_url == null){
            request.setResult(FinalMessage.MANDATORY_FIELD_IS_EMPTY);
            return;
        }
        if (typeRecord_name.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_TYPE_RECORD_NAME_LENGTH);
            return;
        }
        request.setResult("OK");
    }
}
