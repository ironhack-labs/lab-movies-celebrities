const express = require('express')
const router = require("express").Router();
const { isLoggedIn } = require('../middlewares/route.guard')
const Celebrity = require('./../models/Celebrity.model')

// Celebrities List
router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebrities => res.render('celebrities/celebrities.hbs', { celebrities }))
        .catch(err => console.log(err))

})

// Create new Celebrities PRIVATE
router.get('/celebrities/create', isLoggedIn, (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', isLoggedIn, (req, res, mext) => {
    const { name, occupation, catchPhrase, imageUrl } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase, imageUrl })
        .then(newCelebrity => res.redirect('/celebrities'))
        .catch(err => console.log(err)) //revisar el error del ejercicio
})

module.exports = router;
