// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { route } = require('.');
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => res.render('celebrities/new-celebrity'))


// all your routes here
router.post('/celebrities/create', (req, res, next) => {
    let { name, occupation, catchPhrase } = req.body

    Celebrity.create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.render('celebrities/new-celebrity'))

})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities })
        })

        .cath(err => console.log(err))

})

module.exports = router;
