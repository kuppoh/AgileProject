const mysql = require('mysql2');
const express = require('express');
const { promisePool } = require('./database'); // Ensure to import the promise pool for async operations
const app = express();
const ejsLayouts = require("express-ejs-layouts"); // npm module for using ejs with express
const session = require("express-session"); // npm module for keeping track of sessions

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

// for session
app.use(
    session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    },
    })
);

const { forwardAuthenticated, ensureAuthenticated, isAdmin } = require("./middleware/checkAuth");
app.use(passport.initialize()); // for authentication setup
app.use(passport.session());  // helps with managin user sessions in passport

app.set("view engine", "ejs"); // sets view engine to use ejs

app.get('/createdb', async (req, res) => {
    try {
        let sql = 'CREATE DATABASE IF NOT EXISTS nodemysql'; // Use IF NOT EXISTS to prevent error if it already exists
        const [result] = await promisePool.query(sql);
        console.log(result);
        res.send('Database created...');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating database');
    }
});

app.get('/createpoststable', async (req, res) => {
    try {
        let sql = 'CREATE TABLE IF NOT EXISTS posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'; // Again, use IF NOT EXISTS
        const [result] = await promisePool.query(sql);
        console.log(result);
        res.send('Posts table created...');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating posts table');
    }
});




app.listen(3000, () => {
    console.log('Server started on port 3000');
});
