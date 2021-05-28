package org.example.RestAPI.JUnitTest.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.RestAPI.controller.UserController;
import org.example.RestAPI.model.User;
import org.example.RestAPI.repository.UserRepository;
import org.example.RestAPI.request.user.SignupRequest;
import org.example.RestAPI.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
    }

    @Test
    public void addUserTests() throws Exception {
        /*** check empty database before test ***/
        assertEquals(0, userRepository.findAll().size());

        /*** save a default user ***/
        User user = new User();
        user.setUser_name("User");
        user.setPassword("123456");
        userRepository.save(user);

        SignupRequest request = new SignupRequest();
        request.setUser_name("User");
        request.setPassword("123457");
        request.setConfirm_password("123457");

        mvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
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
