package org.example.RestAPI.JUnitTest.record;

import org.example.RestAPI.model.User;
import org.example.RestAPI.model.Wallet;
import org.example.RestAPI.model.Record;
import org.example.RestAPI.repository.UserRepository;
import org.example.RestAPI.repository.WalletRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RecordTests {
    @Autowired
    UserRepository userRepository;

    @Autowired
    WalletRepository walletRepository;

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

        Record record = new Record();
    }

    @After
    public void deleteAll(){
        userRepository.deleteAll();
        walletRepository.deleteAll();
    }
}
