const express = require('express');
const router = express.Router();
const { promiseUserPool } = require('../config/database');
router.get('/createdb', async (req, res) => {
    try {
        let sql = 'CREATE DATABASE IF NOT EXISTS nodemysql'; // Use IF NOT EXISTS to prevent error if it already exists
        const [result] = await promiseUserPool.query(sql);
        console.log(result);
        res.send('Database created...');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating database');
    }
});

router.get('/createpoststable', async (req, res) => {
    try {
        let sql = 'CREATE TABLE IF NOT EXISTS posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'; // Again, use IF NOT EXISTS
        const [result] = await promiseUserPool.query(sql);
        console.log(result);
        res.send('Posts table created...');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating posts table');
    }
});
router.get('/users', async (req, res) => {
    try {
        const [rows] = await promiseUserPool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting users');
    }
});
module.exports = router;