package org.example.RestAPI.JUnitTest.typerecord;

import org.example.RestAPI.model.TypeRecord;
import org.example.RestAPI.repository.TypeRecordRepository;
import org.example.RestAPI.request.typerecord.CreateTypeRecordRequest;
import org.example.RestAPI.request.typerecord.UpdateTypeRecordRequest;
import org.example.RestAPI.service.ITypeRecordService;
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

import java.util.Optional;

import static org.example.RestAPI.JUnitTest.converter.ConvertObjectToString.asJsonString;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TypeRecordTests {
    @Autowired
    TypeRecordRepository typeRecordRepository;

    @Autowired
    ITypeRecordService typeRecordService;

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mvc;

    @Before
    public void setUp(){
        mvc = MockMvcBuilders.webAppContextSetup(wac).build();

        /*** save a default type record ***/
        TypeRecord typeRecord = new TypeRecord();
        typeRecord.setTypeRecord_name("Type record");
        typeRecord.setImage_url("Image url");
        typeRecordRepository.save(typeRecord);
    }

    @After
    public void deleteAll(){
        typeRecordRepository.deleteAll();
    }

    @Test
    public void checkAddTypeRecord() throws Exception {
        /*** check if insert type record successfully ***/
        Optional<TypeRecord> typeRecord = typeRecordService.findByTypeRecord_name("Type record");
        assertNotEquals(typeRecord, null);

        /*** Test 1: check mandatory field is empty: image url ***/
        CreateTypeRecordRequest request = new CreateTypeRecordRequest();
        request.setTypeRecord_name("Type record 12345");
        request.setImage_url(null);

        mvc.perform(post("/typeRecord/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, typeRecordRepository.findAll().size());

        /*** Test 2: check type record name is longer than max length ***/
        request = new CreateTypeRecordRequest();
        request.setTypeRecord_name("1234567890123456789012345678901234567890123456789012345678901234567890");
        request.setImage_url("Image url");

        mvc.perform(post("/typeRecord/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, typeRecordRepository.findAll().size());

        /*** Test 3: check if type record name is existed ***/
        request = new CreateTypeRecordRequest();
        request.setTypeRecord_name("Type record");
        request.setImage_url("Image url");

        mvc.perform(post("/typeRecord/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, typeRecordRepository.findAll().size());

        /*** Test 4: create type record successfully ***/
        request = new CreateTypeRecordRequest();
        request.setTypeRecord_name("Type record 2");
        request.setImage_url("Image url");

        mvc.perform(post("/typeRecord/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(2, typeRecordRepository.findAll().size());
    }

    @Test
    public void checkUpdateTypeRecord() throws Exception {
        /*** check if insert type record successfully ***/
        Optional<TypeRecord> typeRecord = typeRecordService.findByTypeRecord_name("Type record");
        assertNotEquals(typeRecord, null);
        Long typeRecord_id = typeRecord.get().getId();

        /*** Test 1: check if type record is existed ***/
        UpdateTypeRecordRequest request = new UpdateTypeRecordRequest();
        request.setTypeRecord_id(typeRecord_id + 1);
        request.setTypeRecord_name("Type record 2");
        request.setImage_url("Image url");

        mvc.perform(put("/typeRecord/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, typeRecordRepository.findAll().size());

        /*** Test 2: check mandatory field is empty: image url ***/
        request = new UpdateTypeRecordRequest();
        request.setTypeRecord_id(typeRecord_id);
        request.setTypeRecord_name("Type record 2");
        request.setImage_url(null);

        mvc.perform(put("/typeRecord/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, typeRecordRepository.findAll().size());

        /*** Test 3: check type record name is longer than max length ***/
        request = new UpdateTypeRecordRequest();
        request.setTypeRecord_id(typeRecord_id);
        request.setTypeRecord_name("1234567890123456789012345678901234567890123456789012345678901234567890");
        request.setImage_url("Image url");

        mvc.perform(put("/typeRecord/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, typeRecordRepository.findAll().size());

        /*** Test 4: update type record successfully ***/
        request = new UpdateTypeRecordRequest();
        request.setTypeRecord_id(typeRecord_id);
        request.setTypeRecord_name("Type record 2");
        request.setImage_url("Image url 2");

        mvc.perform(put("/typeRecord/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, typeRecordRepository.findAll().size());
    }

    @Test
    public void checkDeleteTypeRecord(){

    }
}
