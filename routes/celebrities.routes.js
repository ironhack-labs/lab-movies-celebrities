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

// GET /celebrities/:id
router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(celebrityData => {
            res.render('celebrities/celebrity-details', {celebrity: celebrityData})
        })
        .catch(err => {
            console.error(err);
        });
});

// GET /celebrities/:id/edit
router.get('/celebrities/:id/edit', (req, res, next) => {
    const { id } = req.params;
    let celebrityDetails;

    Celebrity.findById(id)
        .then(celebrityFromDB => {
            celebrityDetails = celebrityFromDB;
            res.render('celebrities/edit-celebrity', {celebrity: celebrityDetails})
        })
        .catch(err => {
            console.error(err);
        });
});

// POST /celebrities/:id/edit
router.post('/celebrities/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true })
        .then((updatedCeleb) => {
            res.redirect(`/celebrities/${updatedCeleb.id}`)
        })
        .catch(err => {
            console.error(err);
        });
});

// POST /celebrities/:id/delete
router.post('/celebrities/:id/delete', (req, res, next) => {
    const { id } = req.params;

    Celebrity.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => {
            console.error(err);
        });
});

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