package com.example.movies.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class IndexController {

    @GetMapping("/Sign_Up")
    public String Sign_Up(){
        return "Sign_Up";
    }
    @GetMapping("/")
    public String Sign_In(){
        return "Sign_In";
    }
    @GetMapping("/Welcome")
    public String Welcome(){
        return "Welcome";
    }
    @GetMapping("/BookMarks")
    public String BookMarks(){
        return "BookMarks";
    }

}
