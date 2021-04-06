package org.example.RestAPI.response.record;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateRecordResponse {
    private long record_id;
    private long wallet_id;
    private long typeRecord_id;
}
