package com.example.movies.controller;

import com.example.movies.dao.UsersJdbcDAO;
import com.example.movies.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignUpController {

    private UsersJdbcDAO usersJdbcDAO;

    public SignUpController(UsersJdbcDAO usersJdbcDAO){
        this.usersJdbcDAO=usersJdbcDAO;
    }

    @PostMapping("localhost:8080/SignUp")
    public void insertNewUser(User user){
        usersJdbcDAO.Create(user);
    }
}
