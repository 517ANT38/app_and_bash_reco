#!/bin/bash
echo -n "Пользователь БД $USER ввидите "
psql -U $USER -W -h "localhost" -p 5432 --file=app_start/create_database.sql
pm2 start -f --name app /app/app_marks/index.js 
