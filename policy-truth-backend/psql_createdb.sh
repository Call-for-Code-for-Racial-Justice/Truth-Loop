#/bin/sh

export $(egrep -v '^#' .env | xargs)
psql -h $DB_HOST -p $DB_PORT -U $DB_USERNAME postgres -v dbname=$DB_DATABASE_NAME -f ./createdb.sql

