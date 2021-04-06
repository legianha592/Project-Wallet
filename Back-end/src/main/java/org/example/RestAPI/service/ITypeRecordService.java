package org.example.RestAPI.service;

import org.example.RestAPI.model.TypeRecord;

import java.io.ByteArrayInputStream;
import java.lang.reflect.Type;
import java.util.Optional;

public interface ITypeRecordService {
    Optional<TypeRecord> findById(long id);

    Optional<TypeRecord> findByTypeRecord_name(String typeRecord_name);

    void addTypeRecord(TypeRecord typeRecord);

    void deleteTypeRecord(TypeRecord typeRecord);

    ByteArrayInputStream loadTypeRecord();
}
