package org.example.RestAPI.service;

import org.example.RestAPI.model.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface IAuthenticationService {
    void setLoggedInCookie(HttpServletResponse response, User user);

    User getLoggedInUser(HttpServletRequest request);
}
