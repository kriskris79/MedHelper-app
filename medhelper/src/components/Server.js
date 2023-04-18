const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.post('/api/medications', (req, res) => {
    const { name, description, frequency, times, dosage } = req.body;
    const sql = `INSERT INTO medications (name, description, frequency, times, dosage) VALUES (?, ?, ?, ?, ?)`;
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});