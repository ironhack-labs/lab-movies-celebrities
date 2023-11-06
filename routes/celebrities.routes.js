const express = require('express')
const router = express.Router()

const Celebrity = require('./../models/Celebrity.model')

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrities')
})

router.post('/create', (req, res) =>{

    const {name, occupation, catchPhrase} = req.body

    Celebrity
        .create({name, occupation, catchPhrase})
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.get('/', (req, res) =>{

    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', {celebrities}))
        .catch(err => console.log(err))
})