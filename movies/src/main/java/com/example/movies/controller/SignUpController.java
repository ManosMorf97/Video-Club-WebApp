package com.example.movies.controller;

import com.example.movies.dao.DAO;
import com.example.movies.dao.UsersJdbcDAO;
import com.example.movies.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignUpController {

    private DAO<User> dao;

    public SignUpController(DAO<User> dao){
        this.dao=dao;
    }

    @PostMapping("localhost:8080/SignUp")
    public void insertNewUser(User user){
        dao.Create(user);
    }
}
