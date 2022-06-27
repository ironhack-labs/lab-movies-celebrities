const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => {
            console.log(err)
            res.redirect('celebrities/new-celebrity')
        })
});

router.get('/celebrities', (req, res, nex) => {

    Celebrity
        .find()
        .then(cel => res.render('celebrities/celebrities', { cel }))
});


module.exports = router;