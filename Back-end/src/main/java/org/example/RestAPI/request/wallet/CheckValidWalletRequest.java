package org.example.RestAPI.request.wallet;

import org.example.RestAPI.finalstring.FinalMessage;

public class CheckValidWalletRequest {
    public static void checkCreateWalletRequest(CreateWalletRequest request){
        int MAX_LENGTH = 50;
        Long user_id = request.getUser_id();
        String wallet_name = request.getWallet_name();

        if (user_id == null || wallet_name == null){
            request.setResult(FinalMessage.MANDATORY_FIELD_IS_EMPTY);
            return;
        }
        if (wallet_name.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_WALLET_NAME_LENGTH);
            return;
        }
        request.setResult("OK");
    }

    public static void checkUpdateWalletRequest(UpdateWalletRequest request){
        int MAX_LENGTH = 50;
        Long wallet_id = request.getWallet_id();
        String wallet_name = request.getWallet_name();

        if (wallet_id == null || wallet_name == null){
            request.setResult(FinalMessage.MANDATORY_FIELD_IS_EMPTY);
            return;
        }
        if (wallet_name.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_NEW_WALLET_NAME_LENGTH);
            return;
        }
        request.setResult("OK");
    }
}
