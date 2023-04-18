require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const jwt = require('jose');

const app = express();
const secret = 'secret-key';

app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) {
        console.error(`Error connecting to database: ${error}`);
        return;
    }

    console.log('Connected to database');
});

const generateToken = (user) => {
    return jwt.sign({ user }, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, secret);
};

const authenticate = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const token = authorizationHeader.split(' ')[1];

    try {
        req.user = verifyToken(token);
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
};

app.post('/api/medication2', authenticate, (req, res) => {
    const sql = `INSERT INTO medication2 (name, description, frequency, times, dosage) VALUES ?`;
    const values = [
        [req.body.name, req.body.description, req.body.frequency, req.body.times, req.body.dosage]
    ];

    connection.query(sql, [values], (error, results) => {
        if (error) {
            console.error(`Error saving medication: ${error}`);
            return res.status(500).send({ message: 'Error saving medication' });
        }

        res.status(201).send({ message: 'Medication saved successfully' });
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});