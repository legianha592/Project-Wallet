package org.example.RestAPI.response.typerecord;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateTypeRecordResponse {
    private long typeRecord_id;
    private String typeRecord_name;
    private String image_url;
}
