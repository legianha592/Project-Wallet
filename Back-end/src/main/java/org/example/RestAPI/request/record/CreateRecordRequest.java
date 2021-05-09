package org.example.RestAPI.request.record;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
@RequiredArgsConstructor
public class CreateRecordRequest {
    private final int MAX_LENGTH = 50;
    private String title;
    private String note;
    private double amount;
    private long wallet_id;
    private long typeRecord_id;
    private String result;
}
