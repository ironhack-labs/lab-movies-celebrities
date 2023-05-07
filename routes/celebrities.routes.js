const express = require('express');
const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

router.get('/celebrities', (req, res, next) => {
    
    Celebrity
    .find()
    .then(celebrity => res.render('celebrities/celebrities', {celebrity} ))
    .catch(err => console.log(err))

});

router.get('/celebrities/create', (req, res, next) => {
    
    res.render('celebrities/new-celebrity')

});

router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase, imageURL } = req.body

    Celebrity
    .create({ name, occupation, catchPhrase, imageURL })
    .then(celebrity => res.redirect('/celebrities'))
    .catch(err => console.log(err))

});

router.get('/celebrities/:id/edit', (req, res, next) => {
  
    const { id } = req.params

    Celebrity
    .findById(id)
    .then(celebrity => res.render('celebrities/update-celebrity', celebrity))
    .catch(err => console.log(err))

});

router.post('/celebrities/:id/edit', (req, res, next) => {
  
    const { name, occupation, catchPhrase, imageURL } = req.body
    const { id } = req.params

    Celebrity
    .findByIdAndUpdate(id, { name, occupation, catchPhrase, imageURL })
    .then(celebrity => res.redirect('/celebrities'))
    .catch(err => console.log(err))

});

router.get('/celebrities/:id/details', (req, res, next) => {

    const { id } = req.params
    
    Celebrity
    .findById(id)
    .then(celebrity => res.render('celebrities/celebrities-details', celebrity))
    .catch(err => console.log(err))

});

router.post('/celebrities/:id/delete', (req, res, next) => {

    const { id } = req.params

    Celebrity
    .findByIdAndDelete(id)
    .then(() => res.redirect('/celebrities'))
    .catch(err => console.log(err))

});


module.exports = router;