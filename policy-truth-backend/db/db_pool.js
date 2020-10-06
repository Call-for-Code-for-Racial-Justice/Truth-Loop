const Pool = require('pg').Pool

var dbHost = process.env.DB_HOST || 'localhost';
var dbUserName = process.env.DB_USERNAME || 'NO_SET';
var dbPassword = process.env.DB_PASSWORD || 'NO_SET';
var dbPort = process.env.DB_PORT || 5432;
var dbDatabaseName = process.env.DB_DATABASE_NAME || 'policydb';

const pool = new Pool({
    host: dbHost,
    port: dbPort,
    database: dbDatabaseName,
    user: dbUserName,
    password:  dbPassword,
})

module.exports = {
    pool
}
