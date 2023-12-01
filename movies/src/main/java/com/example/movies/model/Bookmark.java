package com.example.movies.model;

public class Bookmark {

    public Bookmark(){}

    public Bookmark(String email,String movieId) {
        this.movieId = movieId;
        this.email = email;
    }

    public Bookmark(String email) {
        this.email = email;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String movieId;

    private String email;
}
