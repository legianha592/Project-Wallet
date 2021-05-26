package org.example.RestAPI.request.user;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class SignupRequest {
    private String user_name;
    private String password;
    private String confirm_password;
    private String result;
}
