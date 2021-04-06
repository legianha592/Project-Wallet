package org.example.RestAPI.request.wallet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
public class UpdateWalletRequest {
    private final int MAX_LENGTH = 50;
    private long wallet_id;
    private String wallet_name;
    private String result;

    public UpdateWalletRequest(long wallet_id, String wallet_name) {
        this.wallet_id = wallet_id;
        this.wallet_name = wallet_name;
        this.checkValidRequest();
    }

    private void checkValidRequest(){
        if (wallet_name.length() > MAX_LENGTH){
            this.result = FinalMessage.INVALID_NEW_WALLET_NAME_LENGTH;
        }
        else{
            this.result = new String("OK");
        }
    }
}
