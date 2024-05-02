const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const sslCertPath = path.join(__dirname, process.env.SSL_CERT_PATH);

let sslOptions = {};
try {
    sslOptions = {
        ca: fs.readFileSync(sslCertPath)
    };
} catch (error) {
    console.error(`Failed to load SSL certificate from path: ${sslCertPath}`, error);
    process.exit(1);  // Terminate the application if SSL configuration fails
}

const userPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: sslOptions
});

const promiseUserPool = userPool.promise();

module.exports = { promiseUserPool };
