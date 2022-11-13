
// const express = require('express');
const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body


    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(() => {
            res.render('celebrities/new-celebrity')
        })
})

router.get('/celebrities', (req, res) => {
    Celebrity
        .find()
        .then((celebritiesArray) => {
            const celebrities = {
                celebritiesArray
            }
            res.render('celebrities/celebrities', celebrities)
        })
        .catch(err => (err))
})

router.get('/celebrities/:celebrity_id/celebrities-details', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebritiesArray => {
            res.render('celebrities/celebrities-details', celebritiesArray)
        })
        .catch(err => (err))
})


router.get('/celebrities/:celebrity_id/celebrities-update', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebritiesArray => {
            res.render('celebrities/celebrities-update', celebritiesArray)
        })
        .catch(err => (err))
})

router.post('/celebrities/:celebrity_id/celebrities-update', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => (err))
})

router.post('/celebrities/:celebrity_id/delete', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndDelete(celebrity_id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => (err))
})


module.exports = router;