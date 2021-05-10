const express = require('express')
const { request } = require('http')
const router = express.Router()
const connection = require('../app')
var nodemailer = require('nodemailer');
// router.get('/images', (req, res) => {
//     console.log('images')
//     res.render('back2jpeg')
// })
const users = { name: "ADMIN", email: 'diseasesearch@gmail.com', password: '12345678' }
let userislogin = false

router.get('/', (req, res) => {
    connection.query('SELECT * FROM disease', (error, rows, fields) => {
        if (!error) {
            res.render("home", { rows, userislogin })
        } else {
            console.log("error")
            res.send("NO Disease Name In the database")

        }
    })
})


router.post('/search', (req, res) => {
    const search = req.body.searchname

    connection.query(`SELECT * FROM disease where disease_name regexp '${search}'`, (error, rows, fields) => {
        if (!error) {
            res.render("home", { rows, userislogin })

        } else {
            res.redirect('/')
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
                            connection.query(`SELECT disease_data FROM disease where Id=${req.query.id};`, (error, pop4, fields) => {
                                if (!error) {

                                    res.render("data", { pop1, pop2, pop3, pop4, disease_name, userislogin })
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
    if (userislogin) {
        res.render("ubdate_database",{userislogin})

    }
    else {
        res.render("login")
    }
})

router.post('/form', (req, res) => {
    let data = req.body;
    let about=data.about_disease
    let symtom = data.Symtoms
    let prevention = data.Prevention
    let causes = data.causes

    connection.query(`SELECT * FROM disease where disease_name="${data.name}"`, (error, rows, fields) => {
        if (rows[0] == undefined) {
            connection.query(`insert into disease(disease_name,disease_data) values ('${data.name}','${about}')`, (error, rows2, fields) => {
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


router.post('/contact', (req, res) => {
    const data = req.body

    connection.query(`insert into contact(name,email,message) values("${data.name}","${data.email}","${data.message}")`, (error, rows, fields) => {
        if (!error) {
            console.log("contact send to database")
        } else {

            console.log("popq")

        }
    })

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'diseasesearch123@gmail.com',
            pass: 'disease@123'
        }
    });

    var mailOptions = {
        from: `diseasesearch123@gmail.com`,
        to: 'diseasesearch123@gmail.com',
        subject: `${data.name},project query`,
        text: `${data.message}   .
         Email Id is = ${data.email}`
    };

    transporter.sendMail(mailOptions, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent');
        }
    });
})
router.get('/login', (req, res) => {
    res.render('login.ejs')
})
router.post('/login', (req, res) => {
    let password = req.body.password
    let email = req.body.email
    const name = users.name
    if (users.email == email) {

        if (users.password == password) {
            userislogin = true
            connection.query('SELECT * FROM disease', (error, rows, fields) => {
                if (!error) {
                    res.render("home", { rows, name, userislogin })
                } else {
                    console.log("error")
                    res.send("NO Disease Name In the database")

                }
            })

        }
        else {
            let mes = { message: "wrong password" }
            res.render('login', { mes })
        }
    }
    else {
        let mes = { message: "wrong email" }
        res.render('login', { mes })
    }
})

router.get('/logout', (req, res) => {
    userislogin = false;
    res.redirect('/')
})



module.exports = router




