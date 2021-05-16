const express = require('express')
const mysql = require('mysql')
const expressLayout = require('express-ejs-layouts')
const path = require("path")
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// const bodyparser = require('body-parser')

// app.use(bodyparser.json)
app.use(expressLayout)
app.set('view engine', 'ejs')



var connection = mysql.createConnection({

    host: 'remotemysql.com',
    user: 'lBKw8YSwBc',
    password: 'xhVjpwBx7U',
    database: 'lBKw8YSwBc',

});
// var connection = mysql.createConnection({

//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'medical_search_engine',
//     port: '3306'
// });
module.exports = connection;


connection.connect((error) => {
    if (error) {
        throw error
        setTimeout(handleDisconnect, 2000);
    } else {
        console.log('connected')
    }
})

const port = process.env.PORT || 5000;
app.listen(port)
console.log(port)

app.use('/', require('./routes/index'));

