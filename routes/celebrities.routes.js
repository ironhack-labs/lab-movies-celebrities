const express = require('express')
const router = express.Router()

const Celebrity = require('./../models/Celebrity.model')
const { findById } = require('../models/Movie.model')

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(() => render('celebrities/new-celebrity'))
})

router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrity => res.render('celebrities/celebrities', { celebrity }))
        .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    Celebrity
        .findById(id)
        .then(celebrity => {
            res.render('celebrities/edit-celebrity', celebrity)
        })
        .catch(error => console.log(error))
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { name, occupation, catchPhrase } = req.body
    console.log('aqui llego')
    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(error => console.log(error))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    Celebrity
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(error => console.log(error))
})


module.exports = router