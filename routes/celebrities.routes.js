const express = require('express')
const router = express.Router()

const Celebrity = require('./../models/Celebrity.model')

router.get('/celebrities/create', (req, res) => {

    Celebrity
        .find()
        .then(() => {
            res.render('celebrities/new-celebrity')
        })
        .catch(err => console.log(err))

})

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            //res.send('Funciono')
            res.redirect('/celebrities')
        })
    .catch(err => console.log(err))

})

router.get('/celebrities', (req, res) => {

    Celebrity
        .find()
        .then(celebrity => {
            //console.log('Funciono')
            res.render('celebrities/celebrities', {celebrity})
        })
        .catch(err => console.log(err))
})


module.exports = router