const router = require("express").Router()
const Celebrity = require("../models/Celebrity.model")
require("../db")


router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities/celebrities'))
        .catch(err => {
            res.render('celebrities/new-celebrity')
            console.log(err)
        })
})

router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})


module.exports = router;