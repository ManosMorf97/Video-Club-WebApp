package com.example.movies.controller;

import com.example.movies.dao.DAO;
import com.example.movies.model.Bookmark;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainPageController {

    private DAO<Bookmark> bookmarkDAO;

    public MainPageController(DAO<Bookmark> bookmarkDAO) {
        this.bookmarkDAO = bookmarkDAO;
    }

    @PostMapping("/WelcomePage")
    public ResponseEntity<String> addBookmark(String movieId){
        Bookmark bm=new Bookmark(SignInController.getSigned_email(),movieId);
        bookmarkDAO.Create(bm);
        return new ResponseEntity<String>("The movie has been added", HttpStatus.OK);

    }

    @GetMapping("/WelcomePage")
    public boolean bookmarkExists(String movieId){
        Bookmark bm=new Bookmark(SignInController.getSigned_email(),movieId);
        return bookmarkDAO.getUnique(bm)!=null;
    }
}
