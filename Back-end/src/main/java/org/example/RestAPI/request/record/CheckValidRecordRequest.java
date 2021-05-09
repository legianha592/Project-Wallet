package org.example.RestAPI.request.record;

import org.example.RestAPI.finalstring.FinalMessage;

public class CheckValidRecordRequest {
    public static void checkCreateRecordRequest(CreateRecordRequest request){
        int MAX_LENGTH = 50;
        String title = request.getTitle();
        String note = request.getNote();

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
        String title = request.getTitle();
        String note = request.getNote();

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
