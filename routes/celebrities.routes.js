const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities', (req, res, next) => {

    Celebrity
        .find()
        .then(Celebrity => {
            res.render('celebrities/celebrities', { Celebrity })
        })
        .catch(err => console.log(err))
})

router.get('/celebrities/create', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrity => {
            res.render('celebrities/new-celebrity', { celebrity })
        })
        .catch(err => console.log(err))
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        // .catch(err => console.log(err))

        .catch(() => res.render('/celebrities/new-celebrity'))
})

module.exports = router;