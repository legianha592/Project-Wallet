package org.example.RestAPI.request.record;

import org.example.RestAPI.finalstring.FinalMessage;

import java.time.LocalDateTime;
import java.util.Date;

public class CheckValidRecordRequest {
    public static void checkCreateRecordRequest(CreateRecordRequest request){
        int MAX_LENGTH = 50;
        String title = request.getTitle();
        String note = request.getNote();
        Double amount = request.getAmount();
        Date record_date = request.getRecord_date();
        Long wallet_id = request.getWallet_id();
        Long typeRecord_id = request.getTypeRecord_id();

        if (title == null || note == null || amount == null || record_date == null || wallet_id == null || typeRecord_id == null){
            request.setResult(FinalMessage.MANDATORY_FIELD_IS_EMPTY);
            return;
        }
        if (title.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_TITLE_RECORD_LENGTH);
            return;
        }
        if (note.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_NOTE_RECORD_LENGTH);
            return;
        }
        request.setResult("OK");
    }

    public static void checkUpdateRecordRequest(UpdateRecordRequest request){
        int MAX_LENGTH = 50;
        Long record_id = request.getRecord_id();
        String title = request.getTitle();
        String note = request.getNote();
        Double amount = request.getAmount();
        Date record_date = request.getRecord_date();
        Long typeRecord_id = request.getTypeRecord_id();

        if (record_id == null || title == null || note == null || amount == null || record_date == null || typeRecord_id == null){
            request.setResult(FinalMessage.MANDATORY_FIELD_IS_EMPTY);
            return;
        }
        if (title.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_TITLE_RECORD_LENGTH);
            return;
        }
        if (note.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_NOTE_RECORD_LENGTH);
            return;
        }
        request.setResult("OK");
    }
}
