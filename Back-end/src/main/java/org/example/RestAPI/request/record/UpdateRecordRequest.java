package org.example.RestAPI.request.record;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@RequiredArgsConstructor
public class UpdateRecordRequest {
    private Long record_id;
    private String title;
    private String note;
    private Double amount;
    private Date record_date;
    private Long typeRecord_id;
    private String result;
}