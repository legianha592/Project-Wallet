package org.example.RestAPI.request.typerecord;

import lombok.Data;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
public class UpdateTypeRecordRequest {
    private final int MAX_LENGTH = 50;
    private long typeRecord_id;
    private String typeRecord_name;
    private String image_url;
    private String result;

    public UpdateTypeRecordRequest(long typeRecord_id, String typeRecord_name, String image_url){
        this.typeRecord_id = typeRecord_id;
        this.typeRecord_name = typeRecord_name;
        this.image_url = image_url;
        this.checkValidRequest();
    }

    private void checkValidRequest(){
        if (this.typeRecord_name.length() > MAX_LENGTH){
            result = FinalMessage.INVALID_TYPERECORD_NAME_LENGTH;
            return;
        }
        result = new String("OK");
    }
}
