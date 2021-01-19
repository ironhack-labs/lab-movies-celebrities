const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity.model')

//============add new celebrity============
router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs')
});

router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
        .then(res.redirect('/celebrities'))
        .catch((err) => console.log(`There was an error saving the Celebrity: ${err}`));
    res.redirect('back')
});

//============list all celebrities============
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((celebritiesFromDB) =>
            res.render('celebrities/celebrities.hbs', {
                celebritiesFromDB
            }))
        .catch((err) =>
            console.log(`There was an error retrieving the celebrities: ${err}`));
});

//============delete a celebrity============
router.post('/celebrities/:celebrityId/delete', (req, res, next) => {
    Celebrity.findByIdAndRemove(req.params.celebrityId)
        .then(() => res.redirect('/celebrities'))
        .catch((err) => console.log(`Error while deleting the celebrity from DB: ${err}`));
});

//============edit a celebrity============
router.get('/celebrities/:celebrityId/edit', (req, res, next) => {
    Celebrity.findById(req.params.celebrityId)
        .then((foundCelebrity) => {
            res.render('celebrities/edit-celebrity.hbs', { foundCelebrity });
        })
        .catch((err) => console.log(`Error while editing the celebrity details from DB: ${err}`));
});

router.post('/celebrities/:celebrityId/update', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.findByIdAndUpdate(req.params.celebrityId, { name, occupation, catchPhrase }, { new: true })
        .then((updatedCelebrity) => {
            res.redirect(`/celebrities/${updatedCelebrity.id}`);
        })
        .catch((err) => console.log(`Error while saving the Celebrity updates: ${err}`));
});

//============display Celebrity Details============
router.get('/celebrities/:celebrityId', (req, res, next) => {
    Celebrity.findById(req.params.celebrityId)
        .then((foundCelebrity) => {
            res.render("celebrities/celebrity-details.hbs", {
                foundCelebrity
            });
        })
        .catch((err) => console.log(`Error while getting the celebrity details from DB: ${err}`));
});
module.exports = router;