package org.example.RestAPI.JUnitTest.user;

import org.example.RestAPI.controller.UserController;
import org.example.RestAPI.model.User;
import org.example.RestAPI.repository.UserRepository;
import org.example.RestAPI.request.user.ChangePasswordRequest;
import org.example.RestAPI.request.user.LoginRequest;
import org.example.RestAPI.request.user.SignupRequest;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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

        /*** save a default user ***/
        User user = new User();
        user.setUser_name("User123456");
        user.setPassword("123456");
        userRepository.save(user);
    }

    @After
    public void deleteAll(){
        userRepository.deleteAll();
    }

    @Test
    public void checkAddUser() throws Exception {
        /*** Test 1: Check mandatory field in request: user name (can change to password/confirm password) ***/
        SignupRequest request = new SignupRequest();
        request.setUser_name(null);
        request.setPassword("123456");
        request.setConfirm_password("123456");

        mvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, userRepository.findAll().size());

        /*** Test 2: Check invalid length of user name in request (can change to password) ***/
        request = new SignupRequest();
        request.setUser_name("User");
        request.setPassword("123456");
        request.setConfirm_password("123456");

        mvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, userRepository.findAll().size());

        /*** Test 3: Check invalid character inside user name in request (can change to password) ***/
        request = new SignupRequest();
        request.setUser_name("User12%&$#");
        request.setPassword("123456");
        request.setConfirm_password("123456");

        mvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, userRepository.findAll().size());

        /*** Test 4: Check password and confirm password are not equal in request ***/
        request = new SignupRequest();
        request.setUser_name("Username");
        request.setPassword("123456");
        request.setConfirm_password("654321");

        mvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, userRepository.findAll().size());

        /*** Test 5: Check user name is existed in database ***/
        request = new SignupRequest();
        request.setUser_name("User123456");
        request.setPassword("654321");
        request.setConfirm_password("654321");

        mvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, userRepository.findAll().size());

        /*** Test 5: Check successful request ***/
        request = new SignupRequest();
        request.setUser_name("User654321");
        request.setPassword("654321");
        request.setConfirm_password("654321");

        mvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(2, userRepository.findAll().size());
    }

    @Test
    public void checkLogin() throws Exception {
        /*** Test 1: Check user name is existed in database ***/
        LoginRequest request = new LoginRequest();
        request.setUser_name("User654321");
        request.setPassword("654321");

        mvc.perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        /*** Test 2: Check wrong password ***/
        request = new LoginRequest();
        request.setUser_name("User123456");
        request.setPassword("654321");

        mvc.perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        /*** Test 3: Check successful request ***/
        request = new LoginRequest();
        request.setUser_name("User123456");
        request.setPassword("123456");

        mvc.perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void checkChangePassword() throws Exception {
        Optional<User> findUser= userRepository.findByUser_name("User123456");
        Long id = findUser.get().getId();

        /*** Test 1: Check mandatory field in request: id (can change to old password, new password) ***/
        ChangePasswordRequest request = new ChangePasswordRequest();
        request.setId(id);
        request.setOld_password(null);
        request.setNew_password("654321");
        mvc.perform(put("/user/changepassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        /*** Test 2: Check wrong password in request ***/
        request = new ChangePasswordRequest();
        request.setId(id);
        request.setOld_password("654321");
        request.setNew_password("654321");

        mvc.perform(put("/user/changepassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        /*** Test 3: Check invalid length of password in request ***/
        request = new ChangePasswordRequest();
        request.setId(id);
        request.setOld_password("123456");
        request.setNew_password("kdiwplwkxxowiaakapoiewjlkaslkjclkajowijelkadoiasdjuwjaoidjweoifj");

        mvc.perform(put("/user/changepassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        /*** Test 4: Check invalid character inside new password in request ***/
        request = new ChangePasswordRequest();
        request.setId(id);
        request.setOld_password("123456");
        request.setNew_password("123456&&&");

        mvc.perform(put("/user/changepassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isBadRequest())
                .andDo(MockMvcResultHandlers.print());

        /*** Test 5: Check user name is existed in database ***/
        request = new ChangePasswordRequest();
        request.setId(1L);
        request.setOld_password("123456");
        request.setNew_password("654321");

        mvc.perform(put("/user/changepassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        /*** Test 6: Check successful request ***/
        request = new ChangePasswordRequest();
        request.setId(id);
        request.setOld_password("123456");
        request.setNew_password("654321");

        mvc.perform(put("/user/changepassword")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }
}
