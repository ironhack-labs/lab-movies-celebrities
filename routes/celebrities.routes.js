const express = require('express')
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')


// Show celebrity
router.get('/celebrities', (req, res, next) => {

    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebritiesFromDB => {
            res.render('celebrities/celebrities', { celebritiesFromDB })
        })
        .catch(err => console.log(err))

})


// Create celebrity (render)
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})


// Create celebrity (handler)
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))

})



module.exports = router;