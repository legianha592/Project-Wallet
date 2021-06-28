package org.example.RestAPI.response.record;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
public class UpdateRecordResponse {
    private long record_id;
    private String title;
    private String note;
    private double amount;
    private Date record_date;
    private long wallet_id;
    private long typeRecord_id;
}
