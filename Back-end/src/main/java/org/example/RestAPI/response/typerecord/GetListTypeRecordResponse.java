package org.example.RestAPI.response.typerecord;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.RestAPI.model.TypeRecord;

import java.util.ArrayList;
import java.util.List;

@Data
public class GetListTypeRecordResponse {

    @Data
    @AllArgsConstructor
    class MyTypeRecord{
        long id;
        String typeRecord_name;
    }


    private List<MyTypeRecord> list_typeRecord = new ArrayList<MyTypeRecord>();

    public GetListTypeRecordResponse(List<TypeRecord> list_typeRecord) {
        for (TypeRecord typeRecord : list_typeRecord) {
            MyTypeRecord myTypeRecord = new MyTypeRecord(typeRecord.getId(),typeRecord.getTypeRecord_name());
            this.list_typeRecord.add(myTypeRecord);
        }

    }
}
