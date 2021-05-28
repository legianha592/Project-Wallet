package org.example.RestAPI.request.user;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ChangePasswordRequest {
    private Long id;
    private String old_password;
    private String new_password;
    private String result;
}
