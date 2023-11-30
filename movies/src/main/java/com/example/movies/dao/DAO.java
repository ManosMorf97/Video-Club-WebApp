package com.example.movies.dao;

import java.util.List;
import java.util.Optional;

public interface DAO<T> {

    List<T> list();

    boolean Create(T t);


    Optional<T> get(T t);

    Optional<T> getUnique(T t);

    void update(T t);

    void delete(T t);
}
