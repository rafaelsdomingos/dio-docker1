"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const connectionString = 'postgresql://postgres:q1w2e3@db:5432/postgres';
const db = new pg_1.Pool({ connectionString });
exports.default = db;
