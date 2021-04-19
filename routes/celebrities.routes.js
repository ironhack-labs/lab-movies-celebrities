const express = require('express')
const router = express.Router()

const Celebrity = require('../models/celebrity')

router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {
    Celebrity.create(req.body)
        .then((result) => {
            console.log(result)
            res.render('/celebrities/')
        })
        .catch((error) => {
            console.log(error)
            res.render('/celebrities/new-celebrity')
        })
})

router.get('/celebrities', (req, res)=>{
    Celebrity.find({})
    .then((result)=>{
    console.log(result)
    res.render('celebrities/celebrities', {data: result})
    })
    .catch((error)=>{
    console.log(error)
    })
    
})

module.exports = router