"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'Creepyfy',
    port: 5432
});
exports.default = pool;
/*
CREATE TABLE categories(
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
    info TEXT NOT NULL,
    create_at INTEGER NOT NULL);

CREATE TABLE story(
    id UUID PRIMARY KEY NOT NULL,
    title VARCHAR NOT NULL,
    narrator VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    genre VARCHAR NOT NULL,
    source VARCHAR NOT NULL,
    art_url VARCHAR NOT NULL,
    create_at INTEGER NOT NULL,
    duration INTEGER NOT NULL); */ 
//# sourceMappingURL=psql-conn.js.map