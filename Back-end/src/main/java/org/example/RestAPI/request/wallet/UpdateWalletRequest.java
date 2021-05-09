package org.example.RestAPI.request.wallet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
@RequiredArgsConstructor
public class UpdateWalletRequest {
    private long wallet_id;
    private String wallet_name;
    private String result;
}
