// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require('express');
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movies.model')

router.get('/create', (req, res) => {

    res.render("celebrities/new_celebrity")
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(celebrity => res.render('celebrities/celebrities', { celebrity }))
        .catch(err => console.log(err))

})

router.post('/:celebrity_id/delete', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndDelete(celebrity_id)
        .then(celebrity => res.redirect('/celebrities'))
        .catch(err => console.log(err))

})

router.get('/:celebrity_id/edit', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebrity => res.render('celebrities/edit-celebrity', celebrity))
        .catch(err => console.log(err))


})

router.post('/:celebrity_id/edit', (req, res) => {
    const { celebrity_id } = req.params
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
        .then(celebrity => res.redirect(`/celebrities`))
        .catch(err => console.log(err))
})
router.get('/:celebrity_id/details', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebrity => res.render('celebrities/celebrity-details', celebrity))
        .catch(err => console.log(err))

})
module.exports = router;