// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

// -------- CELEBRITIES routes here

// Create Celebrity 
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity-page')
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => {
            console.log('Oh! An error occurred when creating the new celebrity', err)
            res.render('celebrities/new-celebrity-page')
        })
})

// Celebrities List
router.get('/celebrities', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrities => {
            console.log('These are the celebrities', celebrities)
            res.render('celebrities/celebrities-page', { celebrities })
        })
        .catch(err => console.log('Oh! An error occurred when listing all celebrities', err))
})

// Celebrity Details
router.get('/celebrities/:id', (req, res, next) => {
    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celeb => res.render('celebrities/celebrity-details-page', celeb))
        .catch(err => console.log('Oh! An error occurred when showing celebrity details', err))
})

// Delete Celebrity
router.post('/celebrities/:id/delete', (req, res, next) => {
    const { id } = req.params

    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log('Oh! An error occurred when deleting a celebrity', err))
})

// Update Celebrities
router.get('/celebrities/:id/edit', (req, res, next) => {
    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celeb => res.render('celebrities/edit-celebrity-page', celeb))
        .catch(err => console.log(err))
})

router.post('/celebrities/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => res.redirect(`/celebrities/${id}`))
        .catch(err => console.log(err))
})

module.exports = router;