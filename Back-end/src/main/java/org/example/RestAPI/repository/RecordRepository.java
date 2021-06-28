package org.example.RestAPI.repository;

import org.example.RestAPI.model.Record;
import org.example.RestAPI.model.TypeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
    @Query(value = "SELECT * FROM RECORD WHERE title = :record_title", nativeQuery = true)
    Optional<Record> findByRecord_title(@Param("record_title") String title);
}
