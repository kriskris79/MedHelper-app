//
// require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql');
// const jwt = require('jsonwebtoken');
//
// const app = express();
// const secret = 'secret-key';
//
// app.use(express.json());
//
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });
//
// connection.connect((error) => {
//     if (error) {
//         console.error(`Error connecting to database: ${error}`);
//         return;
//     }
//
//     console.log('Connected to database');
// });
//
// const generateToken = (user) => {
//     return jwt.sign({ user }, secret, { expiresIn: '365d' });
// };
//
// const verifyToken = (token) => {
//     return jwt.verify(token, secret);
// };
//
// const authenticate = (req, res, next) => {
//     const authorizationHeader = req.headers.authorization;
//
//     if (!authorizationHeader) {
//         return res.status(401).send({ message: 'Unauthorized' });
//     }
//
//     const token = authorizationHeader.split(' ')[1];
//
//     try {
//         req.user = verifyToken(token);
//         next();
//     } catch (error) {
//         return res.status(401).send({ message: 'Unauthorized' });
//     }
// };
//
// app.post('/api/medication2', authenticate, (req, res) => {
//     const sql = `INSERT INTO medication2 (name, description, frequency, times, dosage) VALUES ?`;
//     const values = [
//         [req.body.name, req.body.description, req.body.frequency, req.body.times, req.body.dosage]
//     ];
//
//     connection.query(sql, [values], (error, results) => {
//         if (error) {
//             console.error(`Error saving medication: ${error}`);
//             return res.status(500).send({ message: 'Error saving medication' });
//         }
//
//         res.status(201).send({ message: 'Medication saved successfully' });
//     });
// });
//
// app.post('/api/reset-token', (req, res) => {
//     const user = req.body.user;
//     const newToken = generateToken(user);
//
//     // Store the new token in a database or other persistent storage
//
//     res.status(200).send({ message: 'Token reset successful', newToken });
// });
//
// app.listen(3000, () => {
//     console.log('Server started on port 3000');
// });

require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const secret = 'secret-key';

app.use(express.json());
app.use(cors({
    origin: [ 'http://localhost:3000', 'http://localhost:3001', 'http://mysql2.kkak.dreamhosters.com/medication2', 'http://mysql2.kkak.dreamhosters.com' ]
}));
// app.use(cors({ origin: 'http://localhost:3001' }));
// app.use(cors({ origin: 'http://mysql2.kkak.dreamhosters.com/medication2' }));
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

connection.connect((error) => {
    if (error) {
        console.error(`Error connecting to database: ${error}`);
        return;
    }

    console.log('Connected to database');
});

const generateToken = (ip) => {
    return jwt.sign({ ip }, secret, { expiresIn: '365d' });
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
        req.ip = verifyToken(token).ip;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
};

app.post('/api/medication2', authenticate, (req, res) => {
    const sql = `INSERT INTO medication2 (name, description, frequency, times, dosage, ip) VALUES ?`;
    const values = [
        [req.body.name, req.body.description, req.body.frequency, req.body.times, req.body.dosage, req.ip]
    ];

    connection.query(sql, [values], (error, results) => {
        if (error) {
            console.error(`Error saving medication: ${error}`);
            return res.status(500).send({ message: 'Error saving medication' });
        }

        res.status(201).send({ message: 'Medication saved successfully' });
    });
});

app.post('/api/reset-token', (req, res) => {
    const ip = req.ip;
    const newToken = generateToken(ip);

    res.status(200).send({ message: 'Token reset successful', newToken });
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});