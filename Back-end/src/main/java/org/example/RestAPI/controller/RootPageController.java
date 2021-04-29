package org.example.RestAPI.controller;

import org.example.RestAPI.finalstring.FinalMessage;
import org.example.RestAPI.model.Message;
import org.example.RestAPI.model.User;
import org.example.RestAPI.response.user.LoginResponse;
import org.example.RestAPI.response.user.SignupResponse;
import org.example.RestAPI.service.IAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/")
public class RootPageController {
    @Autowired
    IAuthenticationService authenticationService;

    @GetMapping("/")
    public ResponseEntity getRootPage(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
//        if (cookies != null){
//            for (Cookie cookie : cookies){
//                System.out.println(cookie.getName() + " - " + cookie.getPath() + " - " + cookie.getMaxAge());
//            }
//        }
//        else{
//            System.out.println("cookies is null");
//        }

        User user = authenticationService.getLoggedInUser(request);
        Message<LoginResponse> message;
        if (user == null){
            message = new Message<>(FinalMessage.NO_USER, null);
//            System.out.println("message = " + FinalMessage.NO_USER);
        }
        else{
            message = new Message<>(FinalMessage.LOGIN_SUCCESS, new LoginResponse(user, true));
//            System.out.println("message = " + FinalMessage.LOGIN_SUCCESS);
        }
        return new ResponseEntity<Message<LoginResponse>>(message, HttpStatus.OK);
    }
}
