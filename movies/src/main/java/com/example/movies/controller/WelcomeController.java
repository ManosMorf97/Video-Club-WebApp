package com.example.movies.controller;

import com.example.movies.dao.DAO;
import com.example.movies.model.Bookmark;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {

    private DAO<Bookmark> bookmarkDAO;

    public WelcomeController(DAO<Bookmark> bookmarkDAO) {
        this.bookmarkDAO = bookmarkDAO;
    }

    @PostMapping("/Welcome")
    @ResponseBody
    public ResponseEntity<String> addBookmark(@RequestBody Bookmark bookmark){
        bookmarkDAO.Create(bookmark);
        return new ResponseEntity<String>("The movie has been added", HttpStatus.OK);

    }

}
