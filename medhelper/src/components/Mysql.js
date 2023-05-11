const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }

    console.log('Connected to MySQL server on DreamCpmpute!');

    connection.query('SELECT * FROM medication2', (err, results) => {
        if (err) {
            console.error('Error querying database: ', err);
            return;
        }

        console.log(results);
        connection.end();
    });
});

// const mysql = require('mysql');
// require('dotenv').config();
//
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });
//
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL database: ', err);
//         return;
//     }
//
//     console.log('Connected to MySQL server!');
// });
//
// function insertMedication(name, description, frequency, times, dosage) {
//     const query = `INSERT INTO medication2 (name, description, frequency, times, dosage)
//                    VALUES (?, ?, ?, ?, ?)`;
//     const values = [name, description, frequency, times, dosage];
//
//     connection.query(query, values, (err, results) => {
//         if (err) {
//             console.error('Error inserting medication: ', err);
//             return;
//         }
//
//         console.log('New medication added to the database with ID:', results.insertId);
//         connection.end(); // Close the connection after inserting the medication
//     });
// }
//
// // Insert a new medication
// insertMedication('Medication A', 'This is a medication for X', 'Daily', '8:00 AM', '1 pill', () => {
//     // Close the connection after inserting the medication
//     connection.end();
// });