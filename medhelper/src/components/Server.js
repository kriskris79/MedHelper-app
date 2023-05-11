require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    authPlugins: {
        'mysql_native_password': {}
    }
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database: ', error);
    } else {
        console.log('Connected to the database.');
    }
});

app.post('/api/medication2', (req, res) => {
    const { name, description, frequency, times, dosage } = req.body;
    const sql = `INSERT INTO medication2 (name, description, frequency, times, dosage) VALUES (?, ?, ?, ?, ?)`;
    const values = [name, description, frequency, times, dosage];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error saving medication: ', error);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

app.get('/api/medication2', (req, res) => {
    const sql = `SELECT * FROM medication2`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error retrieving medications: ', error);
            res.sendStatus(500);
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});