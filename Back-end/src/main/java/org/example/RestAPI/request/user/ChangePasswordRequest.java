package org.example.RestAPI.request.user;

import lombok.Data;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
public class ChangePasswordRequest {
    private long id;
    private String old_password;
    private String new_password;
    private String result;

    public ChangePasswordRequest(long id, String old_password, String new_password) {
        this.id = id;
        this.old_password = old_password;
        this.new_password = new_password;
    }
}
