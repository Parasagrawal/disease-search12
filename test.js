const express = require('express')
const mysql = require('mysql')
const app = express()

var connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'company',
    port: '3306'
});

connection.connect((error) => {
    if (error) {
        throw error
    } else {
        console.log('connected')
    }
})

connection.query('INSERT INTO employees VALUES(6,"PALLI","india")', (error, rows) => {
    if (error) {
        throw error
    } else {
        console.log('inserted rows')
        console.log(rows)
    }
})
const port = process.env.PORT || 5000;
app.listen(port)
console.log(port)

