package org.example.RestAPI.request.user;

import lombok.*;

@Data
public class LoginRequest {
    private String user_name;
    private String password;
    private boolean isRememberMe;
}
