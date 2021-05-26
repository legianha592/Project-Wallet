package org.example.RestAPI.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "type_record")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String typeRecord_name;
    private String image_url;
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

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "typeRecord",
            cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Record> listRecord = new ArrayList<>();
    public void addRecord(Record record){
        record.setTypeRecord(this);
    }

    @ManyToMany(mappedBy = "setTypeRecord")
    private List<Wallet> listWallet = new ArrayList<>();
    public void addWallet(Wallet wallet){
        listWallet.add(wallet);
    }
    public void deleteWallet(Wallet wallet){
        listWallet.remove(wallet);
    }
}
