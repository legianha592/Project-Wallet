package org.example.RestAPI.request.record;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class CreateRecordRequest {
    private String title;
    private String note;
    private Double amount;
    private Date record_date;
    private Long wallet_id;
    private Long typeRecord_id;
    private String result;
}
