package org.example.RestAPI.request.typerecord;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UpdateTypeRecordRequest {
    private Long typeRecord_id;
    private String typeRecord_name;
    private String image_url;
    private String result;
}
