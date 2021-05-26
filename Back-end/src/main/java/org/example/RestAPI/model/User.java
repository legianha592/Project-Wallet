package org.example.RestAPI.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    public User(String user_name, String password) {
        this.user_name = user_name;
        this.password = password;
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String user_name;
    private String password;
    private LocalDateTime created_date;
    @PrePersist
    public void prePersist(){
        created_date = LocalDateTime.now();
        modified_date = LocalDateTime.now();
    }
    private LocalDateTime modified_date;
    @PreUpdate
    public void preUpdate(){
        modified_date = LocalDateTime.now();
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user",
                cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wallet> listWallet = new ArrayList<>();
    public void addWallet(Wallet wallet){
//        listWallet.add(wallet);
        wallet.setUser(this);
    }
}
