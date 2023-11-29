package com.example.movies.dao;

import java.util.List;
import java.util.Optional;

public interface DAO<T> {

    List<T> list();

    void Create(T t);

    Optional<T> get(String email,String password);

    void update(T t,String password);

    void delete(String id);
}
