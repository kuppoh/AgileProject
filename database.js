const mysql = require('mysql2');
const fs = require('fs');
// Create a connection pool
const pool = mysql.createPool({
    host: 'project-database-do-user-15573434-0.c.db.ondigitalocean.com',
    user: 'doadmin',
    database: 'nodemysql',
    password: 'AVNS_HvCmdlAaYSXYNncGcPI',
    port: 25060,
    ssl: {
        // You might need to download a CA certificate from DigitalOcean if they provide one
        ca: fs.readFileSync(__dirname + '/ca-certificate.crt')
    }
});

// Promisify for Node.js async/await.
const promisePool = pool.promise();

module.exports = { promisePool };
