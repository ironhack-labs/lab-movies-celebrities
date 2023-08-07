const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model")

router.get('/create', (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect("/celebrities/celebrities"))
        .catch(err => res.render("clebrities/new-celebrity"))
})

router.get('/celebrities', (req, res, next) => {
    // res.render()
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})









module.exports = router;