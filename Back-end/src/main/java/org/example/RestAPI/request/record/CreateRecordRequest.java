package org.example.RestAPI.request.record;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.RestAPI.finalstring.FinalMessage;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class CreateRecordRequest {
    private String title;
    private String note;
    private double amount;
    private LocalDateTime record_date;
    private long wallet_id;
    private long typeRecord_id;
    private String result;
}
