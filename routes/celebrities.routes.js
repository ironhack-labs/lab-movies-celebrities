const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;

    const newCelebrity = new Celebrity({
        name,
        occupation,
        catchPhrase,
    });

    newCelebrity
        .save()
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch((err) => {
            console.error(err);
            res.render('celebrities/new-celebrity');
        });
});

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render('celebrities/celebrities', { celebrities });
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post("/celebrities/create", (req, res, next) => {
    Celebrity.create(celebrityDetails)
        .then(() => {
            res.redirect("/celebrities")
        }).catch((error) => {
            console.log(error);
        });
})

module.exports = router;
