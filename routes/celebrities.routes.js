// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require('express');
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

router.get('/create', (req, res) => {
    // res.send("holaaaaaaaaa")
    res.render("celebrities/new-celebrity")
});

router.post("/create", (req, res) => {

    const { name, occupation, catchPhrase, } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect(`/celebrities`))
        .catch(err => res.redirect(`/celebrities/new-celebrity`))
});

router.get('/', (req, res) => {
    // res.send("holaaaaaaaaa")
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
});

module.exports = router;