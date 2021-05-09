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
        User user = authenticationService.getLoggedInUser(request);
        Message<LoginResponse> message;
        if (user == null){
            message = new Message<>(FinalMessage.NO_USER, null);
        }
        else{
            message = new Message<>(FinalMessage.LOGIN_SUCCESS, new LoginResponse(user, true));
        }
        return new ResponseEntity<Message<LoginResponse>>(message, HttpStatus.OK);
    }
}