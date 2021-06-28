package org.example.RestAPI.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "record")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Record {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private double amount;
    private String title;
    private String note;
    private Date record_date;
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

    @ManyToOne(fetch = FetchType.EAGER)
    private Wallet wallet;
    public void setWallet(Wallet wallet){
        this.wallet = wallet;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    private TypeRecord typeRecord;
    public void setTypeRecord(TypeRecord typeRecord){
        this.typeRecord = typeRecord;
    }

}
