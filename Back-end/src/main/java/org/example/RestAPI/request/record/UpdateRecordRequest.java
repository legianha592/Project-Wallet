package org.example.RestAPI.request.record;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class UpdateRecordRequest {
    private long record_id;
    private String title;
    private String note;
    private double amount;
    private LocalDateTime record_date;
    private long typeRecord_id;
    private String result;
}