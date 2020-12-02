"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'spooky',
    port: 5432
});
exports.default = pool;
/*
CREATE TABLE categories(
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    description TEXT NOT NULL,
    img_url VARCHAR NOT NULL,
    create_at INTEGER NOT NULL,
    type INTEGER NOT NULL);

CREATE TABLE tales(
    
    id UUID PRIMARY KEY NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT NOT NULL,
    source VARCHAR NOT NULL,
    art_url VARCHAR NOT NULL,
    
    subject_to VARCHAR NOT NULL,
    subject_to_id UUID NOT NULL,

    publisher VARCHAR NOT NULL,
    publisher_id UUID NOT NULL,

    duration INTEGER NOT NULL,
    create_at INTEGER NOT NULL,
    explicit BOOLEAN NOT NULL,
    type INTEGER NOT NULL); */
/*     CREATE TABLE podcaster(
        id UUID PRIMARY KEY NOT NULL,
        name VARCHAR NOT NULL,
        description TEXT NOT NULL,
        img_url VARCHAR NOT NULL,
        instagram VARCHAR NOT NULL,
        facebook VARCHAR NOT NULL,
        twitter VARCHAR NOT NULL,
        youtube VARCHAR NOT NULL,
        web VARCHAR NOT NULL,
        create_at INTEGER NOT NULL,
        type INTEGER NOT NULL);  */
/*
CREATE TABLE series(
id UUID PRIMARY KEY NOT NULL,
name VARCHAR NOT NULL,
description TEXT NOT NULL,
img_url VARCHAR NOT NULL,

external_story_link VARCHAR NOT NULL,
publisher_id UUID NOT NULL,
publisher VARCHAR NOT NULL,
explicit BOOLEAN NOT NULL,


create_at INTEGER NOT NULL,
type INTEGER NOT NULL);  */
/*         CREATE TABLE publishers (
            id UUID PRIMARY KEY NOT NULL,
            name VARCHAR NOT NULL,
            description TEXT NOT NULL,
            img_url VARCHAR NOT NULL,
            instagram VARCHAR NOT NULL,
            facebook VARCHAR NOT NULL,
            twitter VARCHAR NOT NULL,
            youtube VARCHAR NOT NULL,
            web VARCHAR NOT NULL,
            create_at INTEGER NOT NULL,
            type INTEGER NOT NULL); */
/*
        CREATE TABLE albums (
        id UUID PRIMARY KEY NOT NULL,
        name VARCHAR NOT NULL,
        img_url VARCHAR NOT NULL,
        publisher VARCHAR NOT NULL,
        publisher_id UUID NOT NULL,
        external_url  VARCHAR NOT NULL,
        copyright VARCHAR NOT NULL,
        create_at INTEGER NOT NULL,
        type INTEGER NOT NULL); */
/*             CREATE TABLE stories (

                id UUID PRIMARY KEY NOT NULL,
                pageId INTEGER NOT NULL,
                title VARCHAR NOT NULL,
                body TEXT NOT NULL,
                images JSONb NOT NULL,
                categories JSONb NOT NULL,
                create_at bigint NOT NULL,
                type INTEGER NOT NULL
                ); */
/*                 CREATE TABLE images (

                    id UUID PRIMARY KEY NOT NULL,
                    articleId UUID KEY NOT NULL,
                    pageId INTEGER NOT NULL,
                    title VARCHAR NOT NULL,
                    images JSONb NOT NULL,
                    ); */
//# sourceMappingURL=psql-conn.js.map