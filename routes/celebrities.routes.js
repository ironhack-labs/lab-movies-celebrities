const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

//Celebrity creation
router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/newCelebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    Celebrity.create(req.body)
    .then(() => res.redirect('/celebrities'))
    .catch(error => console.log('The following error ocurred when creating the celebrity: ', error))
})
//find all celebrities
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(allCelebrities => {
            res.render('celebrities/celebrities', {celebrities: allCelebrities})
    })
})

//Celebrity profile
router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
    .then(celebrityFound => {
        res.render('celebrities/celebrityDetails', {celebrity: celebrityFound})
    })
    .catch(error => console.log('There was an error when looking for the celebrity´s profile: ', error))
})

//Celebrity profile edit
router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
    .then(celebrityFound => {
        res.render('celebrities/editCelebrity', {celebrity: celebrityFound })
    })
    .catch(error => console.log('There was an error when looking for the celebrity´s profile: ', error))  
    })

router.post('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect('/celebrities'))
    .catch(error => console.log('Updating celebrity error: ', error))
})
//Delete the celebrity
router.post('/celebrities/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndDelete(req.params.id)
    .then(res.redirect('celebrities/celebrities'))
    .catch(error => console.log('Deleting celebrity error: ', error))
})

module.exports = router 
