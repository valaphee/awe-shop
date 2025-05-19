create table item
(
    id    bigint not null
        primary key,
    name  text,
    image text,
    tags  int[]  not null
);

create unique index item_name_key on item (lower(name));

create table shop
(
    id   bigint generated always as identity
        primary key,
    name text,
    addr text not null
);

create unique index shop_name_key on shop (lower(name));

create table list
(
    id   bigint generated always as identity
        primary key,
    shop bigint not null
        references shop,
    item bigint not null
        references item,
    url  text
);

create unique index list_key on list (shop, item);

create table list_price
(
    id   bigint    not null
        references list,
    at   timestamp not null default current_timestamp,
    "is" int       not null
);
