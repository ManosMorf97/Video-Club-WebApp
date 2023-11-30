package com.example.movies.dao;

import com.example.movies.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UsersJdbcDAO implements DAO<User>{

    RowMapper<User> rowMapper= (rs,rowNum)->{
        User user=new User();
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        return user;
    };

    private static final Logger log= LoggerFactory.getLogger(UsersJdbcDAO.class);
    private JdbcTemplate jdbcTemplate;

    public UsersJdbcDAO(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }
    @Override
    public List<User> list() {
        String sql="Select user from Users";
        return jdbcTemplate.query(sql,rowMapper);
    }

    @Override
    public boolean Create(User user) {
        String sql="Insert into Users values(?,?)";
        int insert=jdbcTemplate.update(sql,user.getEmail(),user.getPassword());
        if (insert==1){
            log.info("New user added "+user.getEmail());
            return true;
        }
        log.info("That user already exists");
        return false;

    }
    @Override
    public Optional<User> get(User user) {
        String sql="Select * from Users where email=? and password=?";
        try{
            User user2=jdbcTemplate.queryForObject(sql,rowMapper,user.getEmail(),user.getPassword());
            return Optional.ofNullable(user2);
        }catch(DataAccessException ex){
            log.info("Password or/and email are wrong");
        }
        return null;
    }

    @Override
    public Optional<User> getUnique(User user) {
        return Optional.empty();
    }

    @Override
    public void update(User user) {
        String sql="Update Users set password=? where email=?";
        int update=jdbcTemplate.update(sql,user.getPassword(),user.getEmail());
        if(update==1){
            log.info("Dear "+user.getEmail()+" your password has been changed");
        }
    }

    @Override
    public void delete(User user) {
        String sql="Delete from Users where email=?";
        int update=jdbcTemplate.update(sql,user.getEmail());

    }
}
