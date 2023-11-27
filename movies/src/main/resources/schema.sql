create table if not exists Users(
    email varchar(30) not null primary key,
    password varchar(20) not null
);