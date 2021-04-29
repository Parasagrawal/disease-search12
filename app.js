const express = require('express')
const mysql = require('mysql')
const expressLayout = require('express-ejs-layouts')
const path=require("path")
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// const bodyparser = require('body-parser')

// app.use(bodyparser.json)
app.use(expressLayout)
app.set('view engine', 'ejs')


var connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'medical_search_engine',
    port: '3306'
});
module.exports = connection;

connection.connect((error) => {
    if (error) {
        throw error
    } else {
        console.log('connected')
    }
})

// connection.query('INSERT INTO employees VALUES(6,"lol","india")', (error, rows) => {
//     if (error) {
//         throw error
//     } else {
//         console.log('inserted rows')
//         console.log(rows)
//     }
// })
const port = process.env.PORT || 5000;
app.listen(port)
console.log(port)

app.use('/', require('./routes/index'));


// app.use('/data', require('./routes/user'))

// app.use('/users', require('./routes/index'))
// app.get('/', (req, res) => {
//     connection.query('SELECT * FROM employees', (error, rows, fields) => {
//         if (!error) {
//             // res.send({rows})
//             // res.send(rows)
//             console.log(rows)
//         } else 
//             console.log("error")
//     })
// })
