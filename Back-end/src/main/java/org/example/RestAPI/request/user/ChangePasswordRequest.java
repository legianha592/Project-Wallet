package org.example.RestAPI.request.user;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ChangePasswordRequest {
    private long id;
    private String old_password;
    private String new_password;
    private String result;
}
