package org.example.RestAPI.request.user;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
@RequiredArgsConstructor
public class ChangePasswordRequest {
    private long id;
    private String old_password;
    private String new_password;
    private String result;
}
