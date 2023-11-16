#!/bin/bash
sudo rm -rf /app/app_marks
echo -n "Пользователь БД $USER ввидите "
psql -U $USER --password -c "DROP DATABASE IF EXISTS appmarks"