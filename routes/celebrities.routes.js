const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({name, occupation, catchPhrase})
        .then(() => {
            res.render('celebrities/celebrities')
        })
        .catch(() => {
            res.render('celebrities/new-celebrity')
        })
})

module.exports = router;