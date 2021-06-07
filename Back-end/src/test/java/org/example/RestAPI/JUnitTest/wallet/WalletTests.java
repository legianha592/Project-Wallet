package org.example.RestAPI.JUnitTest.wallet;

import org.example.RestAPI.controller.WalletController;
import org.example.RestAPI.model.User;
import org.example.RestAPI.model.Wallet;
import org.example.RestAPI.repository.UserRepository;
import org.example.RestAPI.repository.WalletRepository;
import org.example.RestAPI.request.wallet.CreateWalletRequest;
import org.example.RestAPI.service.UserService;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WalletTests {
    @Autowired
    private WalletController walletController;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WalletRepository walletRepository;

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
    }

    @After
    public void deleteAll(){
        userRepository.deleteAll();
        walletRepository.deleteAll();
    }

    @Test
    public void checkAddWallet() throws Exception {
        /*** Check if insert user successfully ***/
        Optional<User> user = userService.findByUser_name("User123456");
        assertNotEquals(user, null);
        Long user_id = user.get().getId();

        /*** Test 1: Check if user is existed ***/
        CreateWalletRequest request = new CreateWalletRequest();
        request.setUser_id(user_id + 1);
        request.setWallet_name("Wallet123");

        mvc.perform(post("/wallet/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(request)))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        assertEquals(1, walletRepository.findAll().size());
    }
}
