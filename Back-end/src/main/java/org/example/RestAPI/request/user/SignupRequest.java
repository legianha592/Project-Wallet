package org.example.RestAPI.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
@RequiredArgsConstructor
public class SignupRequest {
    private String user_name;
    private String password;
    private String confirm_password;
    private String result;
}
