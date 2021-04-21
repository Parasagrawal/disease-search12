const express=require('express')
const router=express.Router()

router.get('/login', (req, res)=> res.send("login"))

router.get('/data', (req, res)=> res.render("register"))
// 



module.exports =router