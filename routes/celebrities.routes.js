const express = require('express')
const router = express.Router()

const Celebrity = require('../models/Celebrity.model')

router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('./celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})

// Create a new celebrity
router.get('/create', (req, res) => {
    res.render('./celebrities/new-celebrity')
})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('./'))
        .catch(() => res.redirect('./create'))
})

// Celeb details with Id
router.get('/:id', (req, res) => {

    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrities => res.render('./celebrities/celebrity-details', celebrities))
        .catch(err => console.log(err))
})

//Delete a movie

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

//Edit a Celeb

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrity => res.render('./celebrities/edit-celebrity', celebrity))
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})
module.exports = router;