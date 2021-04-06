package org.example.RestAPI.repository;

import org.example.RestAPI.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    @Query(value = "SELECT * FROM WALLET WHERE user_id = :user_id", nativeQuery = true)
    List<Wallet> findByUser_id(@Param("user_id") long user_id);
}
