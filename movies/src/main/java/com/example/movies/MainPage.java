package com.example.movies;

import com.example.movies.controller.SignInController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainPage {

    //http://www.omdbapi.com/?apikey=1c07e2b7&&s=Batman

    @PostMapping("/MainPage")
    public void store(String movieId){
        SignInController.getSigned_email();
    }
}
