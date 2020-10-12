#!/bin/bash

# just a quick script to load env vars, rebuild and restart the app when developing.

# When using .env, this command works:
# export $(egrep -v '^#' .env | xargs)

export DB_HOST=localhost
export DB_PORT=4321
export DB_USERNAME=devtruthuser
export DB_PASSWORD=tellthetruth
export DB_DATABASE_NAME=policydb

npm install && npm start 
