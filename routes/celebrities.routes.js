const express = require('express')
const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

// Celebrities List
router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebrities => res.render('celebrities/celebrities.hbs', { celebrities }))
        .catch(err => console.log(err))

})

// Create new Celebrities
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, mext) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(newCelebrity => res.redirect('/celebrities'))
        .catch(err => console.log(err)) //revisar el error del ejercicio
})

module.exports = router;