package org.example.RestAPI.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "wallet")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Wallet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String wallet_name;
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
    private double total_amount;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
    public void setUser(User user){
        this.user = user;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "wallet",
            cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Record> listRecord = new ArrayList<>();
    public void addRecord(Record record){
        record.setWallet(this);
    }

    @ManyToMany
    @JoinTable(name = "wallet_typeRecord",
                joinColumns = @JoinColumn(name = "wallet_id"),
                inverseJoinColumns = @JoinColumn(name = "typeRecord_id"))
    private Set<TypeRecord> setTypeRecord = new HashSet<>();
    public void addTypeRecord(TypeRecord typeRecord){
        setTypeRecord.add(typeRecord);
    }
    public void deleteTypeRecord(TypeRecord typeRecord){
        setTypeRecord.remove(typeRecord);
    }
}
