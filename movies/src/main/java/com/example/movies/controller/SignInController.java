package com.example.movies.controller;

import com.example.movies.dao.DAO;
import com.example.movies.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class SignInController {

    private static String signed_email="";

    public static String getSigned_email() {
        return signed_email;
    }

    public static void setSigned_email(String signed_email) {
        SignInController.signed_email = signed_email;
    }



    private DAO<User> dao;

    public SignInController(DAO<User> dao){
        this.dao=dao;
    }

    @PostMapping("/SignIn")
    public ResponseEntity<String> log_in(User user){
        Optional<User> logged_in=dao.get(new User(user.getEmail(),user.getPassword()));
        if (logged_in==null){
            return new ResponseEntity<>("Wrong username and/or password", HttpStatus.NOT_FOUND);
        }else{
            signed_email= user.getEmail();
            return new ResponseEntity<>("Welcome "+user.getEmail(), HttpStatus.OK);
        }

    }

}
