// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require('express');
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

router.get('/create', (req, res) => {
    // res.send("holaaaaaaaaa")
    Celebrity
        .find()
        .then(celebrities => res.render('movies/new-movie', { celebrities }))
        .catch(err => console.log(err))
});// all your routes here

module.exports = router;