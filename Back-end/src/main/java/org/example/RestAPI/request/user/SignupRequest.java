package org.example.RestAPI.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
public class SignupRequest {
    private String user_name;
    private String password;
    private String confirm_password;
    private String result;

    public SignupRequest(String user_name, String password, String confirm_password) {
        this.user_name = user_name;
        this.password = password;
        this.confirm_password = confirm_password;
    }
}
