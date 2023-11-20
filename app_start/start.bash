#!/bin/bash

#установка необхомимых пакетов
packagesNeeded='curl jq postgresql postgresql-contrib'
if [ -x "$(command -v apk)" ];       then sudo apk add --no-cache $packagesNeeded
elif [ -x "$(command -v apt)" ];     then sudo apt update && sudo apt install $packagesNeeded
elif [ -x "$(command -v apt-get)" ]; then sudo apt-get update && sudo apt-get install $packagesNeeded
elif [ -x "$(command -v dnf)" ];     then sudo dnf install $packagesNeeded
elif [ -x "$(command -v zypper)" ];  then sudo zypper install $packagesNeeded
elif [ -x "$(command -v yum)" ];  then sudo yum install $packagesNeeded
else echo "FAILED TO INSTALL PACKAGE: Package manager not found. You must manually install: $packagesNeeded">&2; fi

#запуск сервера postgres
sudo systemctl start postgresql.service
sudo su postgres
psql --file=app_start/create_database.sql
exit
# зависимости приложения
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc
nvm install node
cd app_marks
npm install
npm install pm2 -g
#запуск приложения
cd -
pm2 start -f --name app app_marks/index.js 


