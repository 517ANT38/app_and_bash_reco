CREATE EXTENSION IF NOT EXISTS dblink;
DO
$$
BEGIN
    IF NOT EXISTS (SELECT datname FROM pg_database WHERE datname='appmarks') THEN
       PERFORM dblink_exec('dbname=' || current_database(),'CREATE DATABASE appmarks');
    END IF;
END;
$$;
DROP EXTENSION dblink;