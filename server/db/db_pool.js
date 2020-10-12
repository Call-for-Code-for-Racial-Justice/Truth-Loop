const Pool = require('pg').Pool
const fs = require('fs');

var dbHost = process.env.DB_HOST || 'localhost';
var dbUserName = process.env.DB_USERNAME || 'NO_SET';
var dbPassword = process.env.DB_PASSWORD || 'NO_SET';
var dbPort = process.env.DB_PORT || 5432;
var dbDatabaseName = process.env.DB_DATABASE_NAME || 'policydb';
var dbCertFile = process.env.DB_CERTFILE;


let ssl = false;
if (dbCertFile) {
  ssl = {
    rejectUnauthorized: false,
    ca: fs.readFileSync(process.env.DB_CERTFILE).toString()
  }
}


const config = {
  host: dbHost,
  port: dbPort,
  database: dbDatabaseName,
  user: dbUserName,
  password: dbPassword,
};

if (ssl) {
  config.ssl = ssl;
}

const pool = new Pool(config);

module.exports = {
    pool
}
