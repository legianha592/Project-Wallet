package org.example.RestAPI.request.record;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
@RequiredArgsConstructor
public class UpdateRecordRequest {
    private final int MAX_LENGTH = 50;
    private long record_id;
    private String title;
    private String note;
    private double amount;
    private long typeRecord_id;
    private String result;
    private void checkValidRequest(){
        if (title.length() > MAX_LENGTH){
            result = FinalMessage.INVALID_TITLE_RECORD_LENGTH;
            return;
        }
        if (note.length() > MAX_LENGTH){
            result = FinalMessage.INVALID_NOTE_RECORD_LENGTH;
            return;
        }
        result = new String("OK");
    }
}