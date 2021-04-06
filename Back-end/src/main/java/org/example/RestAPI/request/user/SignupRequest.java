package org.example.RestAPI.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
public class SignupRequest {
    private final int MAX_LENGTH = 20;
    private final int MIN_LENGTH = 6;
    private String user_name;
    private String password;
    private String result;

    public SignupRequest(String user_name, String password) {
        this.user_name = user_name;
        this.password = password;
        this.checkValidRequest();
    }

    private void checkValidRequest(){
        if (this.user_name.length() > MAX_LENGTH || this.user_name.length() < MIN_LENGTH){
            result = FinalMessage.INVALID_USERNAME_LENGTH;
            return;
        }
        if (this.password.length() > MAX_LENGTH || this.password.length() < MIN_LENGTH){
            result = FinalMessage.INVALID_PASSWORD_LENGTH;
            return;
        }
        for (int i=0; i<this.user_name.length(); i++){
            int val = (int) (this.user_name.charAt(i));
            if (!checkRange(val)){
                result = FinalMessage.INVALID_USERNAME_VALUE;
                return;
            }
        }
        for (int i=0; i<this.password.length(); i++){
            int val = (int) (this.password.charAt(i));
            if (!checkRange(val)){
                result = FinalMessage.INVALID_PASSWORD_VALUE;
                return;
            }
        }

        result = new String("OK");
    }

    private boolean checkRange(int val){
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
