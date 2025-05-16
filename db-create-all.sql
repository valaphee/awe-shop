create table item
(
    id   bigint not null
        primary key,
    name character varying(255),
    tags int[]  not null
);

create table shop
(
    id   bigint generated always as identity
        primary key,
    name character varying(255),
    addr text not null,
    url  text
);

create table list
(
    id   bigint generated always as identity
        primary key,
    item bigint not null
        references item,
    shop bigint not null
        references shop
);

create table list_price
(
    id    bigint    not null
        references list,
    at    timestamp not null default current_timestamp,
    price int       not null
);

select create_hypertable('list_price', by_range('at'))
