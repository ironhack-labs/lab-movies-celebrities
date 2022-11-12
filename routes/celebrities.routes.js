
const express = require('express');
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
        .then((celebritiesFormDB) => {
            const celebrities = {
                celebritiesArray: celebritiesFormDB
            }
            res.render('celebrities/celebrities', celebrities)
        })
        .catch(err => (err))
})



module.exports = router;