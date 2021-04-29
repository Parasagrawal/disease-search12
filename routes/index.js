const express = require('express')
const { request } = require('http')
const router = express.Router()
const connection = require('../app')

// router.get('/images', (req, res) => {
//     console.log('images')
//     res.render('back2jpeg')
// })
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


router.post('/search', (req, res) => {
    const search = req.body.searchname

    connection.query(`SELECT * FROM disease where disease_name regexp '${search}'`, (error, rows, fields) => {
        if (!error) {
            res.render("home", { rows })

        } else {

            connection.query('SELECT * FROM disease', (error, rows, fields) => {
                if (!error) {
                    res.render("home", { rows })
                } else {
                    console.log("error")

                }
            })

        }
    })
});

router.get('/data', (req, res) => {
    let disease_name = req.query.disease

    connection.query(`SELECT distinct symtoms.symtom_name FROM disease INNER JOIN symtoms ON ${req.query.id}=symtoms.d_id;`, (error, pop1, fields) => {
        if (!error) {

            connection.query(`SELECT distinct causes.cause FROM disease INNER JOIN causes ON ${req.query.id}=causes.d_id;`, (error, pop2, fields) => {
                if (!error) {
                    connection.query(`SELECT distinct preventions.prevention FROM disease INNER JOIN preventions ON ${req.query.id}=preventions.d_id;`, (error, pop3, fields) => {
                        if (!error) {
                            let pop = { pop1, pop2, pop3 }
                            res.render("data", { pop1, pop2, pop3, disease_name })
                        } else {
                            console.log(error)
                            res.send("no disease")
                        }

                    })
                } else {
                    console.log(error)
                    res.send("no disease")
                }

            })
        }
        else {
            console.log(error)
            res.send("no disease")

        }
    })
})

router.get('/ubdate-database', (req, res) => {
    res.render("ubdate_database")
})

router.post('/form', (req, res) => {
    let data = req.body;
    let symtom = data.Symtoms
    // let prevention = JSON.parse(data.Prevention)
    let prevention = data.Prevention
    let causes = data.causes

    // console.log(data, typeof (data))
    // console.log(prevention, typeof (prevention))
    // console.log(symtom, typeof (symtom))
    // console.log(causes, typeof (causes))
    // console.log(casues, typeof (causes))


    connection.query(`SELECT * FROM disease where disease_name="${data.name}"`, (error, rows, fields) => {
        // console.log(rows[0])
        if (rows[0] == undefined) {
            connection.query(`insert into disease(disease_name) values ('${data.name}')`, (error, rows2, fields) => {
                if (!error) {
                    connection.query(`SELECT Id FROM disease where disease_name='${data.name}'`, (error, id, fields) => {
                        if (!error) {
                            if (typeof (symtom) === 'string') {
                                connection.query(`insert into symtoms values(${id[0].Id},'${symtom}')`, (error, id2, fields) => {
                                    if (error) {
                                        console.log(error)

                                    }
                                })
                            }
                            else {
                                Array.from(symtom).forEach((sym) => {
                                    connection.query(`insert into symtoms values(${id[0].Id},"${sym}")`, (error, id2, fields) => {
                                        if (error) {
                                            console.log(error)
                                        }
                                    })

                                });
                            }
                            if (typeof (prevention) === 'string') {
                                connection.query(`insert into preventions values(${id[0].Id},"${prevention}")`, (error, id2, fields) => {
                                    if (error) {
                                        console.log(error)
                                    }
                                })
                            }
                            else {
                                Array.from(prevention).forEach((pre) => {

                                    connection.query(`insert into preventions values(${id[0].Id},"${pre}")`, (error, id2, fields) => {
                                        if (error) {
                                            console.log(error)
                                        }
                                    })

                                });
                            }
                            if (typeof (causes) === 'string') {
                                connection.query(`insert into causes values(${id[0].Id},"${causes}")`, (error, id2, fields) => {
                                    if (error) {
                                        console.log(error)
                                    }
                                })
                            }
                            else {

                                Array.from(causes).forEach((cau) => {
                                    connection.query(`insert into causes values(${id[0].Id},"${cau}")`, (error, id2, fields) => {
                                        if (error) {
                                            console.log(error)
                                        }
                                    })

                                });
                            }
                        } else {
                            console.log(error)

                        }

                        res.send("Form Accepted")
                    })

                } else {
                    console.log("error")


                }
            })

        } else {

            res.send("disease already exist")


        }
    })


})



module.exports = router