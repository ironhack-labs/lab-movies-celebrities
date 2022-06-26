const router = require("express").Router()

const Celebrity = require('./../models/Celebrity.model')

// celebrity creation

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create(req.body)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})

// celebrity reading

router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(celebirtiesData => {
            res.render('celebrities/celebrities', { celebirtiesData })
        })
        .catch(err => console.log(err))
})

module.exports = router