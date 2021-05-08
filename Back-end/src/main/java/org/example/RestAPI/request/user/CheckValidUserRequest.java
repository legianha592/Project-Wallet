package org.example.RestAPI.request.user;

import org.example.RestAPI.finalstring.FinalMessage;

public class CheckValidUserRequest {
    public static void checkSignupRequest(SignupRequest request){
        int MAX_LENGTH = 20;
        int MIN_LENGTH = 6;
        String user_name = request.getUser_name();
        String password = request.getPassword();
        String confirm_password = request.getConfirm_password();

        if (user_name.length() > MAX_LENGTH || user_name.length() < MIN_LENGTH){
            request.setResult(FinalMessage.INVALID_USERNAME_LENGTH);
            return;
        }
        if (password.length() > MAX_LENGTH || password.length() < MIN_LENGTH){
            request.setResult(FinalMessage.INVALID_PASSWORD_LENGTH);
            return;
        }
        for (int i=0; i<user_name.length(); i++){
            int val = (int) (user_name.charAt(i));
            if (!checkRange(val)){
                request.setResult(FinalMessage.INVALID_USERNAME_VALUE);
                return;
            }
        }
        for (int i=0; i<password.length(); i++){
            int val = (int) (password.charAt(i));
            if (!checkRange(val)){
                request.setResult(FinalMessage.INVALID_PASSWORD_VALUE);
                return;
            }
        }
        if(!password.equals(confirm_password)){
            request.setResult(FinalMessage.CONFIRM_FAIL);
            return;
        }

        request.setResult("OK");
    }

    public static void checkChangePasswordRequest(ChangePasswordRequest request){
        int MAX_LENGTH = 20;
        int MIN_LENGTH = 6;
        String new_password = request.getNew_password();

        if (new_password.length() > MAX_LENGTH || new_password.length() < MIN_LENGTH){
            request.setResult(FinalMessage.INVALID_NEW_PASSWORD_LENGTH);
            return;
        }
        for (int i=0; i<new_password.length(); i++){
            int val = (int) (new_password.charAt(i));
            if (!checkRange(val)){
                request.setResult(FinalMessage.INVALID_NEW_PASSWORD_VALUE);
                return;
            }
        }
        request.setResult("OK");
    }

    private static boolean checkRange(int val){
        //TỪ O ĐẾN 9: 48-57
        if (val >= 48 && val <= 57){
            return true;
        }
        //Từ A đến Z: 65-90
        if (val >= 65 && val <= 90){
            return true;
        }
        //Từ a đến Z: 97-122
        if (val >= 97 && val <= 122){
            return true;
        }
        return false;
    }
}
