const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {

    res.render('celebrities/new-celebrity')
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

        .catch(() => {
            res.render('/celebrities/new-celebrity')
        })
})

router.get('/celebrities', (req, res, next) => {

    Celebrity
        .find()
        .then((celebrityFormDB) => {
            const celebritiesArray = {
                celebrityFormDB
            }
            res.render('celebrities/celebrities', celebritiesArray)
        })
        .catch(err => console.log(err))
})

module.exports = router;