package org.example.RestAPI.request.typerecord;

import org.example.RestAPI.finalstring.FinalMessage;
import org.example.RestAPI.request.typerecord.CreateTypeRecordRequest;
import org.example.RestAPI.request.typerecord.UpdateTypeRecordRequest;

public class CheckValidTypeRecordRequest {
    public static void checkCreateTypeRecordRequest(CreateTypeRecordRequest request){
        int MAX_LENGTH = 50;
        String typeRecord_name = request.getTypeRecord_name();

        if (typeRecord_name.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_TYPERECORD_NAME_LENGTH);
            return;
        }
        request.setResult("OK");
    }

    public static void checkUpdateTypeRecordRequest(UpdateTypeRecordRequest request){
        int MAX_LENGTH = 50;
        String typeRecord_name = request.getTypeRecord_name();

        if (typeRecord_name.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_TYPERECORD_NAME_LENGTH);
            return;
        }
        request.setResult("OK");
    }
}
