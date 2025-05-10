create table producer
(
    id   bigint generated always as identity
        primary key,
    name text not null,
    addr text not null
);

create table product
(
    id       bigint                                                             not null
        primary key,
    producer bigint                                                             not null
        references producer,
    name     text                                                               not null,
    image    varchar(1024),
    ts       tsvector generated always as (to_tsvector('english', name)) stored not null
);

create index ts_idx
    on product using gin (ts);

create table merchant
(
    id   bigint generated always as identity
        primary key,
    name text not null,
    addr text not null,
    url  text
);

create table article
(
    id          bigint generated always as identity
        primary key,
    product     bigint not null
        references product,
    merchant    bigint not null
        references merchant,
    merchant_id bigint
);
