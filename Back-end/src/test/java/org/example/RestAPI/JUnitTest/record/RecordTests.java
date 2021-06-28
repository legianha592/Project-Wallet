package org.example.RestAPI.JUnitTest.record;

import org.example.RestAPI.model.TypeRecord;
import org.example.RestAPI.model.User;
import org.example.RestAPI.model.Wallet;
import org.example.RestAPI.model.Record;
import org.example.RestAPI.repository.RecordRepository;
import org.example.RestAPI.repository.TypeRecordRepository;
import org.example.RestAPI.repository.UserRepository;
import org.example.RestAPI.repository.WalletRepository;
import org.example.RestAPI.request.record.CreateRecordRequest;
import org.example.RestAPI.service.IRecordService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.util.Date;
import java.util.Optional;

import static org.example.RestAPI.JUnitTest.converter.ConvertObjectToString.asJsonString;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RecordTests {
    @Autowired
    UserRepository userRepository;

    @Autowired
    WalletRepository walletRepository;

    @Autowired
    private IRecordService recordService;

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    TypeRecordRepository typeRecordRepository;

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mvc;

    @Before
    public void setUp(){
        mvc = MockMvcBuilders.webAppContextSetup(wac).build();

        /*** save a default user ***/
        User user = new User();
        user.setUser_name("User123456");
        user.setPassword("123456");
        userRepository.save(user);

        Wallet wallet = new Wallet();
        wallet.setWallet_name("Wallet1");
        wallet.setUser(user);
        walletRepository.save(wallet);

        TypeRecord typeRecord = new TypeRecord();
        typeRecord.setTypeRecord_name("Type 1");
        typeRecord.setImage_url("url");
        typeRecordRepository.save(typeRecord);

        Record record = new Record();
        record.setTitle("Title");
        record.setNote("Note");
        record.setAmount(10000.0);
        Date date = new Date();
        record.setRecord_date(date);
        record.setWallet(wallet);
        record.setTypeRecord(typeRecord);
        recordRepository.save(record);
    }

    @After
    public void deleteAll(){
        userRepository.deleteAll();
        walletRepository.deleteAll();
        recordRepository.deleteAll();
        typeRecordRepository.deleteAll();
    }

    @Test
    public void checkAddRecord() throws Exception {
        /*** Check if insert record successfully ***/
        Optional<Record> record = recordService.findByRecord_title("Title");
        assertNotEquals(record, null);
        Long record_id = record.get().getId();
        Long wallet_id = record.get().getWallet().getId();
        Long typeRecord_id = record.get().getTypeRecord().getId();

        /*** Test 1: check if wallet is existed ***/
        CreateRecordRequest request = new CreateRecordRequest();
        request.setTitle("Title123");
        request.setNote("Note123");
        request.setAmount(20000.0);
        Date date = new Date();
        request.setRecord_date(date);
        request.setWallet_id(wallet_id + 1);
        request.setTypeRecord_id(typeRecord_id);

        mvc.perform(post("/record/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, recordRepository.findAll().size());
    }
}
