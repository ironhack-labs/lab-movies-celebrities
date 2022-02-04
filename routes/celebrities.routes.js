const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    Celebrity.create(req.body)
        .then(() => res.redirect('/celebrities'))
        .catch(error => console.log('There was an error creating the new Celebrity: ', error))
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(allCelebrities => {
            res.render('celebrities/celebrities', {celebrities: allCelebrities})
        })
})

router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(celebrityFound => {
            res.render('celebrities/celebrity-details', {celebrity: celebrityFound})
        })
        .catch(error => console.log('Error while retrieving the celebrity: ', error))
})

router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(celebrityFound => {
            res.render('celebrities/edit-celebrity', {celebrity: celebrityFound })
        })
        .catch(error => console.log('Error while retrieving the celebrity: ', error))  
    })

router.post('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect('/celebrities'))
    .catch(error => console.log('Error while updating the Celebrity: ', error))
})

router.post('/celebrities/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndDelete(req.params.id)
        .then(res.redirect('celebrities/celebrities'))
        .catch(error => console.log('Error while deleting the Celebrity: ', error))
})

module.exports = router