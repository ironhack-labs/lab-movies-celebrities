// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require('express')

const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js');

// all your routes here


router.get('/celebrities/create', (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(res.redirect("/celebrities"))
        .catch(res.redirect("/celebrities/new-celebrity"))
})

router.get('/celebrities', (req, res) => {
    Celebrity
        .find()
        .then(allCelebrities => {
            res.render('celebrities/celebrities', { celebrity: allCelebrities })
        })
        .catch(err => console.log(err))
})


module.exports = router;