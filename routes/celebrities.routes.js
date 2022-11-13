const express = require('express');
const router = express.Router();



const Celebrities = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {


    const { name, occupation, catchPhrase } = req.body

    Celebrities
        .create(req.body)
        .then(celebrity => {
            // console.log(celebrity)
            res.redirect('/celebrities')
        })
        .catch(err => res.redirect('/celebrities/create')
        )
})

router.get('/celebrities', (req, res) => {

    Celebrities
        .find()
        .then(celebritiesDb => {
            res.render('celebrities/celebrities', { celebritiesDb })
        })
})

router.get('/celebrities/:id', (req, res) => {

    const { id } = req.params

    Celebrities
        .findById(id)
        .then(celebrity => {

            res.render('celebrities/celebrity-details', celebrity)
        })
        .catch(err => res.redirect('/celebrities'))


})

router.post('/celebrities/:id/delete', (req, res) => {

    const { id } = req.params

    Celebrities
        .findByIdAndDelete(id)
        .then(movie => {
            res.redirect('/celebrities')
        })
        .catch(err => res.redirect('/celebrities')
        )


})

router.get('/celebrities/:id/edit', (req, res) => {
    const { id } = req.params


    Celebrities
        .findByIdAndUpdate(id)
        .then(celebrity => {
            res.render('celebrities/celebrities-update', celebrity)
        })
        .catch(err => res.redirect('/celebrities'))
})

router.post('/celebrities/:id/edit', (req, res) => {

    const { id } = req.params
    const { name, ocupation, catchPhrase } = req.body

    Celebrities
        .findByIdAndUpdate(id, req.body)
        .then(celebrity => {
            res.redirect(`celebrities/celebrity-details`, celebrity)
        })
        .catch(err => res.redirect('/celebrities'))

})












module.exports = router;