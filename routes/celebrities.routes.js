const express = require('express')
const router = express.Router()

const Celebrity = require('./../models/Celebrity.model')

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(() => render('celebrities/new-celebrity'))
})

router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrity => res.render('celebrities/celebrities', { celebrity }))
        .catch(error => console.log(error))
})


module.exports = router