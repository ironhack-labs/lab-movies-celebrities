const express = require('express');
const router = express.Router();

// require the models
const Celebrity = require('../models/Celebrity.model');

/* ROUTES HANDLING: */

// GET /celebrities/create
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

// POST /celebrities/create
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({name, occupation, catchPhrase})
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch(err => {
            res.render('/celebrities/new-celebrity', { errorMessage: 'There was an error creating the celebrity. Try again!'});
        });
})

// GET /celebrities
router.get('/celebrities', (req, res, next) => {
    Celebrity.find({})
        .then(celebritiesArr => {
            res.render('celebrities/celebrities', {celebrity: celebritiesArr});
        })
        .catch(err => {
            console.error("There was an erorr showing the list of Celebrities: ", err);
        });
});

module.exports = router;