package org.example.RestAPI.service;

import org.example.RestAPI.model.User;
import org.example.RestAPI.finalstring.FinalMessage;
import org.example.RestAPI.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

public class AuthenticationService implements IAuthenticationService{
    @Autowired
    UserRepository userRepository;

    @Override
    public void setLoggedInCookie(HttpServletResponse response, User user) {
        Cookie loginCookie = new Cookie(FinalMessage.LOGIN_COOKIE, String.valueOf(user.getId()));
        loginCookie.setMaxAge(30 * 60);
        loginCookie.setPath("/");
        response.addCookie(loginCookie);
    }

    @Override
    public User getLoggedInUser(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null){
            return null;
        }
        for (var cookie : cookies) {
            if (cookie.getName().equals(FinalMessage.LOGIN_COOKIE)) {
                long userId = Long.parseLong(cookie.getValue());
                Optional<User> optionalUser = userRepository.findById(userId);
                if (optionalUser.isPresent()) {
                    return optionalUser.get();
                }
                return null;
            }
        }
    }
}
