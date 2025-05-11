create table producer
(
    id   bigint generated always as identity
        primary key,
    name text not null,
    addr text not null
);

create table merchant
(
    id   bigint generated always as identity
        primary key,
    name text not null,
    addr text not null,
    url  text
);

create table product
(
    id       bigint not null
        primary key,
    name     text   not null,
    producer bigint not null
        references producer
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
