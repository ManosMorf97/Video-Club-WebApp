package com.example.movies.controller;

import com.example.movies.dao.DAO;
import com.example.movies.model.Bookmark;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class BookmarkController {

    private DAO<Bookmark> bookmarkDAO;

    public BookmarkController(DAO<Bookmark> bookmarkDAO){
        this.bookmarkDAO=bookmarkDAO;
    }

    @PostMapping("/MyBookmarks")
    public Optional<Bookmark> myBookmarks(Bookmark bookmark){//email only
        return bookmarkDAO.get(bookmark);
    }

    @DeleteMapping("/MyBookmarks")
    public void deleteBookmark(Bookmark bookmark){// all parameters
        bookmarkDAO.delete(bookmark);//
    }

}
