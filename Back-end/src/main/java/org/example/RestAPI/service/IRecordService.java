package org.example.RestAPI.service;

import org.example.RestAPI.model.Record;

import java.util.Optional;

public interface IRecordService {
    void addRecord(Record record);

    void deleteRecord(Record record);

    Optional<Record> findById(long record_id);

}
