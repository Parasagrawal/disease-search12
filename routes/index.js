const express = require('express')
const { request } = require('http')
const router = express.Router()
const connection = require('../app')

router.get('/', (req, res) => {
    connection.query('SELECT * FROM disease', (error, rows, fields) => {
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

// router.get('/images', (req, res) => {
//     res.attachment");
// }

router.get('/data', (req, res) => {
    console.log(req.query.disease)
    // res.render("data")


    connection.query('SELECT * from symtoms', (error, pop, fields) => {
        if (!error) {
            // res.send({rows})
            // res.send(rows)
            // rows=(rows);
            // console.log(rows[1].name);

            console.log(pop);

            res.render("data")
        } else {
            console.log("error")
            res.send("no disease")

        }
    })
})

module.exports = router