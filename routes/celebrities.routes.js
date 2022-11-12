const express = require('express')
const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')


router.get('/celebrities', (req, res, next) => {

    Celebrity
        .find()
        .then((celebrities) => {
            const celebrity = { celebrityArr: celebrities }
            res.render('celebrities/celebrities', celebrity)
        })
        .catch(err => console.log(err))
})


router.get('/celebrities/create', (req, res, next) => {

    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})




module.exports = router