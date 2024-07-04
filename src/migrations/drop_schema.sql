DROP SCHEMA public CASCADE;

CREATE SCHEMA public;

-- CREATE DATABASE CSC492_Thesis WITH ENCODING 'UTF8';
SET client_encoding = 'UTF8';
-- UPDATE pg_database SET encoding = pg_char_to_encoding('UTF8') WHERE datname='your_database_name';
UPDATE pg_database
SET
    encoding = pg_char_to_encoding ('UTF8')
WHERE
    datname = 'CSC492-Thesis';

UPDATE pg_database
SET
    datcollate = 'en_US.UTF-8'
WHERE
    datname = 'CSC492-Thesis';