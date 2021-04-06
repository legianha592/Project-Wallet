package org.example.RestAPI.request.wallet;

import lombok.Data;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
public class CreateWalletRequest {
    private final int MAX_LENGTH = 50;
    private long user_id;
    private String wallet_name;
    private String result;

    public CreateWalletRequest(long user_id, String wallet_name) {
        this.user_id = user_id;
        this.wallet_name = wallet_name;
        this.checkValidRequest();
    }

    private void checkValidRequest(){
        if (wallet_name.length() > MAX_LENGTH){
            this.result = FinalMessage.INVALID_WALLET_NAME_LENGTH;
        }
        else{
            this.result = new String("OK");
        }
    }
}
