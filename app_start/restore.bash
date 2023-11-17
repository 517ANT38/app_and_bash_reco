#!/bin/bash
cp -r $1 /app
psql -U $USER -W -h "localhost" -p 5432 --file=app_start/create_database.sql
pg_restore -U $USER -W -h localhost -p 5432 -d appmarks $2