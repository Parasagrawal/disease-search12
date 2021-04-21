const express = require('express')
const { request } = require('http')
const router = express.Router()
const connection = require('../app')

router.get('/', (req, res) => {
    connection.query('SELECT name FROM employees', (error, rows, fields) => {
        if (!error) {
            // res.send({rows})
            // res.send(rows)
            // rows=(rows);
            // console.log(rows[1].name);

            console.log(rows);

            res.render("home", { rows })
        } else {
            console.log("error")
            res.send("no disease")

        }
    })
})

router.get('/data', (req, res) => {
    console.log(req.query.disease)
    res.render("data")
})

module.exports = router