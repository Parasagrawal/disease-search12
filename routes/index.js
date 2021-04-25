const express = require('express')
const { request } = require('http')
const router = express.Router()
const connection = require('../app')

router.get('/images', (req, res) => {
    console.log('images')
    res.render('back2jpeg')
})
router.get('/', (req, res) => {
    connection.query('SELECT * FROM disease', (error, rows, fields) => {
        if (!error) {
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
    let disease_name=req.query.disease
    // res.render("data")


    connection.query(`SELECT distinct symtoms.symtom_name FROM disease INNER JOIN symtoms ON ${req.query.id}=symtoms.d_id;`, (error, pop1, fields) => {
        if (!error) {
            // console.log(pop1);

            connection.query(`SELECT distinct causes.cause FROM disease INNER JOIN causes ON ${req.query.id}=causes.d_id;`, (error, pop2, fields) => {
                if (!error) {
                    // res.render("data")
                    connection.query(`SELECT distinct preventions.prevention FROM disease INNER JOIN preventions ON ${req.query.id}=preventions.d_id;`, (error, pop3, fields) => {
                        if (!error) {
                            let pop = { pop1, pop2, pop3 }
                            // console.log(pop);
                            res.render("data", { pop1, pop2, pop3,disease_name})
                        } else {
                            console.log(error)
                            res.send("no disease")
                        }

                        // res.render("data")
                    })
                } else {
                    console.log(error)
                    res.send("no disease")
                }

                // res.render("data")
            })
            // res.render("data")
        }
        else {
            console.log(error)
            res.send("no disease")

        }
    })
})

module.exports = router