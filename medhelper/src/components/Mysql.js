const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server!');
});

connection.query('SELECT * FROM medication2', (err, results) => {
    if (err) throw err;
    console.log(results);
});

connection.end();