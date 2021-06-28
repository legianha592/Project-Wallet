package org.example.RestAPI.response.record;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.RestAPI.model.Record;
import org.example.RestAPI.model.User;
import org.example.RestAPI.model.Wallet;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class GetListRecordResponse {
    @Data
    @AllArgsConstructor
    class MyRecord{
        long id;
        String title;
        String note;
        LocalDateTime created_date;
        LocalDateTime modified_date;
        Date record_date;
        double amount;
        long typeRecord_id;
    }

    public GetListRecordResponse(Wallet wallet){
        this.addList_record(wallet);
        this.total_amount = wallet.getTotal_amount();
    }

    public GetListRecordResponse(User user){
        this.addList_record(user);
    }


    private double total_amount;
    private List<MyRecord> list_record = new ArrayList<>();

    private void addList_record(Wallet wallet){
        List<Record> list = wallet.getListRecord();
        for (int i=0; i<list.size(); i++){
            Record record = list.get(i);

            MyRecord myRecord = new MyRecord(record.getId(), record.getTitle(), record.getNote(),
                    record.getCreated_date(), record.getModified_date(), record.getRecord_date(),
                    record.getAmount(), record.getTypeRecord().getId());
            this.list_record.add(myRecord);
        }
    }

    private void addList_record(User user){
        for (Wallet wallet : user.getListWallet()) {
            addList_record(wallet);
            this.total_amount += wallet.getTotal_amount();
        }
    }
}
