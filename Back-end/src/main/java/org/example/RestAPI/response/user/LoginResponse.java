package org.example.RestAPI.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.RestAPI.model.User;
import org.example.RestAPI.model.Wallet;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
public class LoginResponse {
    @Data
    @AllArgsConstructor
    class MyWallet{
        long id;
        String wallet_name;
        LocalDateTime created_date;
        LocalDateTime modified_date;
        double total_amount;
    }

    public LoginResponse(User user, boolean isRememberMe){
        this.id = user.getId();
        this.isRememberMe = isRememberMe;
        this.addList_wallet(user);
    }
    private long id;
    private boolean isRememberMe;
    private List<MyWallet> list_wallet = new ArrayList<>();

    private void addList_wallet(User user){
        List<Wallet> list = user.getListWallet();
        for (int i = 0; i < list.size(); i++){
            Wallet wallet = list.get(i);
            MyWallet myWallet = new MyWallet(wallet.getId(), wallet.getWallet_name(),
                    wallet.getCreated_date(), wallet.getModified_date(), wallet.getTotal_amount());
            list_wallet.add(myWallet);
        }
    }
}
