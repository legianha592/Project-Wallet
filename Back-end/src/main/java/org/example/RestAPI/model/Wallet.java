package org.example.RestAPI.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.RestAPI.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

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
