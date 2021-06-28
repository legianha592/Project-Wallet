package org.example.RestAPI.repository;

import org.example.RestAPI.model.TypeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypeRecordRepository extends JpaRepository<TypeRecord, Long> {
    @Query(value = "SELECT * FROM TYPE_RECORD WHERE typeRecord_name = :typeRecord_name", nativeQuery = true)
    Optional<TypeRecord> findByTypeRecord_name(@Param("typeRecord_name") String name);
}
