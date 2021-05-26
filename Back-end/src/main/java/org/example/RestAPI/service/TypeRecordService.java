package org.example.RestAPI.service;

import org.example.RestAPI.model.TypeRecord;
import org.example.RestAPI.model.Wallet;
import org.example.RestAPI.repository.TypeRecordRepository;
import org.example.RestAPI.repository.WalletRepository;
import org.example.RestAPI.response.exporter.TypeRecordExporterResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Optional;

@Service
public class TypeRecordService implements ITypeRecordService{
    @Autowired
    TypeRecordRepository typeRecordRepository;

    @Autowired
    WalletRepository walletRepository;

    @Override
    public Optional<TypeRecord> findById(long id) {
        return typeRecordRepository.findById(id);
    }

    @Override
    public List<TypeRecord> getAll() {
        return typeRecordRepository.findAll();
    }

    @Override
    public Optional<TypeRecord> findByTypeRecord_name(String typeRecord_name){
        return typeRecordRepository.findByTypeRecord_name(typeRecord_name);
    }

    @Override
    public void addTypeRecord(TypeRecord typerecord){
        typeRecordRepository.saveAndFlush(typerecord);
    }

    @Override
    public void deleteTypeRecord(TypeRecord typeRecord) {
        typeRecordRepository.delete(typeRecord);
    }

    @Override
    public ByteArrayInputStream loadTypeRecord() {
        List<TypeRecord> listTypeRecord = typeRecordRepository.findAll();
        List<Wallet> listWallet = walletRepository.findAll();

        ByteArrayInputStream in = TypeRecordExporterResponse.TypeRecordEntityToExcel(listTypeRecord, listWallet);
        return in;
    }
}