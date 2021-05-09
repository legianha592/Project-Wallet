package org.example.RestAPI.request.wallet;

import org.example.RestAPI.finalstring.FinalMessage;

public class CheckValidWalletRequest {
    public static void checkCreateWalletRequest(CreateWalletRequest request){
        int MAX_LENGTH = 50;
        String wallet_name = request.getWallet_name();

        if (wallet_name.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_WALLET_NAME_LENGTH);
        }
        else{
            request.setResult("OK");
        }
    }

    public static void checkUpdateWalletRequest(UpdateWalletRequest request){
        int MAX_LENGTH = 50;
        String wallet_name = request.getWallet_name();

        if (wallet_name.length() > MAX_LENGTH){
            request.setResult(FinalMessage.INVALID_NEW_WALLET_NAME_LENGTH);
        }
        else{
            request.setResult("OK");
        }
    }
}
