const express = require('express')
const router = express.Router()

const Celebrity = require('../models/Celebrity.model')


router.get('/create', (req, res) => {

    res.render('celebrities/new-celebrity.hbs')

})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log('ERROR creating celebrity', err))

})

router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log('ERROR listing celebrity', err))


})

module.exports = router