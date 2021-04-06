package org.example.RestAPI.request.wallet;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class DeleteWalletRequest {
    private long wallet_id;
}
