#!/bin/bash
cd app_start || echo 'Вы в каталоге app_start'>&2; exit;
cd ..
sudo rm -rf app_marks
sudo -u postgres psql -c 'DROP DATABASE appmarks'; 