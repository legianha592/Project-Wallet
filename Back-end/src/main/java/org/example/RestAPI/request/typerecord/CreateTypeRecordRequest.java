package org.example.RestAPI.request.typerecord;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.RestAPI.finalstring.FinalMessage;

@Data
@RequiredArgsConstructor
public class CreateTypeRecordRequest {
    private final int MAX_LENGTH = 50;
    private String typeRecord_name;
    private String image_url;
    private String result;
}
