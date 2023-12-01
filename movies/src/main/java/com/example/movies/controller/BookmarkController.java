package com.example.movies.controller;

import com.example.movies.dao.DAO;
import com.example.movies.model.Bookmark;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class BookmarkController {

    private DAO<Bookmark> bookmarkDAO;

    public BookmarkController(DAO<Bookmark> bookmarkDAO){
        this.bookmarkDAO=bookmarkDAO;
    }

    @GetMapping("/MyBookmarks")
    public Optional<Bookmark> myBookmarks(){
        return bookmarkDAO.get(new Bookmark(SignInController.getSigned_email()));
    }

    @DeleteMapping("/MyBookmarks")
    public void deleteBookmark(String movieId){
        bookmarkDAO.delete(new Bookmark(SignInController.getSigned_email(),movieId));
    }

}
