#!/bin/bash
sudo mkdir -p /backups
sudo chown $USER:$USER /backups 
chmod 0777 /backups
rsync -aAXv  /app/app_marks /backups/
echo -n "Пользователь БД $USER ввидите "
pg_dump -U $USER -W -h localhost -p 5432 -d appmarks > /backups/appmarks.dmp