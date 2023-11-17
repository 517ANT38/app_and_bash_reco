#!/bin/bash
cp -r $1 /app
echo -n "Пользователь БД $USER ввидите "
psql -U $USER -W -h "localhost" -p 5432 --file=app_start/create_database.sql
echo -n "Пользователь БД $USER ввидите "
psql -U $USER -W -h localhost -p 5432 -d appmarks --file=$2