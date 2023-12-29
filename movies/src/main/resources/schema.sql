create table if not exists Users(
    email varchar(30) not null primary key,
    password varchar(100) not null
);

create table if not exists Bookmarks(
    email varchar(30) not null ,
    movieId varchar(20) not null ,
    primary key(email,movieId)
);