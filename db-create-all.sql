create table tag
(
    id   int not null
        primary key,
    name character varying(255)
);

create table product
(
    id   bigint not null
        primary key,
    name character varying(255),
    tags int[]  not null
);

create table merchant
(
    id   bigint generated always as identity
        primary key,
    name character varying(255),
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

create table listing
(
    id    bigint generated always as identity
        references article,
    at    timestamp not null,
    price int       not null
);
