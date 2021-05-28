package org.example.RestAPI.JUnitTest.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.RestAPI.controller.UserController;
import org.example.RestAPI.model.User;
import org.example.RestAPI.repository.UserRepository;
import org.example.RestAPI.request.user.SignupRequest;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserTests {
    @Autowired
    private UserController userController;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mvc;

    @Before
    public void setUp(){
        mvc = MockMvcBuilders.webAppContextSetup(wac).build();
        userRepository.deleteAll();

        /*** save a default user ***/
        User user = new User();
        user.setUser_name("User123456");
        user.setPassword("123456");
        userRepository.save(user);
    }

    @Test
    public void checkValidSignUpRequest() throws Exception {
        /*** Test 1: Mandatory field: user name (can change to password/confirm password) ***/
        SignupRequest request = new SignupRequest();
        request.setUser_name(null);
        request.setPassword("123456");
        request.setConfirm_password("123456");

        mvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        /*** Test 2: Check invalid length of user name (can change to password) ***/
        request = new SignupRequest();
        request.setUser_name("User");
        request.setPassword("123456");
        request.setConfirm_password("123456");

        mvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        /*** Test 3: Check invalid character inside user name (can change to password) ***/
        request = new SignupRequest();
        request.setUser_name("User12%&$#");
        request.setPassword("123456");
        request.setConfirm_password("123456");

        mvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        /*** Test 4: Check password and confirm password are not equal ***/
        request = new SignupRequest();
        request.setUser_name("Username");
        request.setPassword("123456");
        request.setConfirm_password("654321");

        mvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
