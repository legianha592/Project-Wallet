package org.example.RestAPI.request.record;

import lombok.Data;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
public class CreateRecordRequest {
    private final int MAX_LENGTH = 50;
    private String title;
    private String note;
    private double amount;
    private long wallet_id;
    private long typeRecord_id;
    private String result;

    public CreateRecordRequest(String title, String note, double amount, long wallet_id, long typeRecord_id) {
        this.title = title;
        this.note = note;
        this.amount = amount;
        this.wallet_id = wallet_id;
        this.typeRecord_id = typeRecord_id;
        this.checkValidRequest();
    }

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
