package org.example.RestAPI.response.wallet;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UpdateWalletResponse {
    private long wallet_id;
    private String wallet_name;
    private LocalDateTime created_date;
    private LocalDateTime modified_date;
    private double total_amount;
}
