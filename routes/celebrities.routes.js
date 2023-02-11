const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')


router.get('/celebrities', (req, res) => {

    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect(`/celebrities/celebrities`))
        .catch(err => res.redirect(`/new-celebrity`))
})










module.exports = router;