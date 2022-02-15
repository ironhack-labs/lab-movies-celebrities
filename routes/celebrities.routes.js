const app = require("../app");

// // starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// ------ Routes ------- //


// Create Celebrity

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
});

module.exports = router;

router.post('/celebrities/create', (req, res, next) => {

const {name, occupation, catchPhrase} = req.body;

Celebrity.create({name, occupation, catchPhrase})
.then(() => {

    res.redirect('/celebrities');

})
.catch((err) => next(err));

})

// Celebrity List

router.get('/celebrities', (req, res, next) => {

    Celebrity.find()
    .then((allCelebs) => {

        res.render('celebrities/celebrities', {celebs: allCelebs})

    })
    .catch((err) => next(err));

})