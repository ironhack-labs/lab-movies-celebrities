// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

// all your routes here
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity.create({ name, occupation, catchPhrase })
    .then(createdCelebrity => {
        console.log(createdCelebrity)
        // ????
        res.redirect('/celebrities')
    })
    .catch(err => next('celebrities/new-celebrity'))
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFromDB => {
        console.log(celebritiesFromDB)
        res.render('celebrities/celebrities', { celebrities: celebritiesFromDB })
    })
    .catch(err => next(err))
})


module.exports = router;