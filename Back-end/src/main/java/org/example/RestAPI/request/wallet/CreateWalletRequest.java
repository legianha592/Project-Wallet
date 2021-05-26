package org.example.RestAPI.request.wallet;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CreateWalletRequest {
    private long user_id;
    private String wallet_name;
    private String result;
}
