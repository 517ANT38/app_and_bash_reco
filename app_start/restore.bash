#!/bin/bash
cp -r $1 /app
pg_restore -U $USER -W -h localhost -p 5432 -d appmarks $2