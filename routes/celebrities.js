// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require('express')
const router = require("express").Router()
const Celebrities = require('./../models/Celebrity.model')

router.get('/celebrities/list', (req, res) => {

    Celebrities
        .find()
        .then(celeb => res.render('celebrities/list', { celeb }))
        .catch(err => console.log(err))
})


router.get('/celebrities/create', (req, res) => {

    res.render('celebrities/new-celebrity')

})

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrities
        .create({ name, occupation, catchPhrase })
        .then(celebrities => res.redirect('/celebrities/list'))
        .catch(err => res.redirect('/celebrities/create'))

})

router.get('/celebrity-details/:celebrity_id', (req, res) => {
    const { celebrity_id } = req.params

    Celebrities
        .findById(celebrity_id)
        .then(celeb => res.render('celebrities/celebrity-details', celeb))
        .catch(err => console.log(err))
})

router.post('/celebrity/:celebrity_id/delete', (req, res) => {
    const { celebrity_id } = req.params

    Celebrities
        .findByIdAndDelete(celebrity_id)
        .then(() => res.redirect('/celebrities/list'))
        .catch(err => console.log(err))


})

router.get('/celebrity/:celebrity_id/edit', (req, res) => {
    const { celebrity_id } = req.params

    Celebrities
        .findById(celebrity_id)
        .then(celeb => res.render('celebrities/edit-celebrity', celeb))
        .catch(err => console.log(err))
})

router.post('/celebrity/:celebrity_id/edit', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    const { celebrity_id } = req.params
    console.log(celebrity_id)

    Celebrities
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
        .then(() => res.redirect(`/celebrity-details/${celebrity_id}`))
        .catch(err => console.log(err))
})



module.exports = router;