package com.example.movies.controller;

import com.example.movies.dao.DAO;
import com.example.movies.model.Bookmark;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class BookmarkController {

    private DAO<Bookmark> bookmarkDAO;

    public BookmarkController(DAO<Bookmark> bookmarkDAO){
        this.bookmarkDAO=bookmarkDAO;
    }

    @PostMapping("/MyBookmarks")
    @ResponseBody
    public Optional<Bookmark> myBookmarks(Bookmark bookmark){//email only
        return bookmarkDAO.get(bookmark);
    }

    @DeleteMapping("/MyBookmarks")
    @ResponseBody
    public void deleteBookmark(Bookmark bookmark){// all parameters
        bookmarkDAO.delete(bookmark);//
    }

}
