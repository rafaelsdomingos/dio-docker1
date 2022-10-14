#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS application_user(
        uuid uuid DEFAULT uuid_generate_v4(),
        username VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        PRIMARY KEY (uuid)
    );

    INSERT INTO application_user (username, password) VALUES ('Francisco', crypt('123456', 'xptokey'));
    INSERT INTO application_user (username, password) VALUES ('Antônio', crypt('123456', 'xptokey'));
    INSERT INTO application_user (username, password) VALUES ('José', crypt('123456', 'xptokey'));
    INSERT INTO application_user (username, password) VALUES ('Maria', crypt('123456', 'xptokey'));
    INSERT INTO application_user (username, password) VALUES ('Marta', crypt('123456', 'xptokey'));
    INSERT INTO application_user (username, password) VALUES ('Fatima', crypt('123456', 'xptokey'));
EOSQL
