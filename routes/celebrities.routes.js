// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities', (req, res, next) => {

    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebritiesFromDB => {
            res.render('celebrities/celebrities', { celebritiesFromDB })
        })
        .catch(err => console.log(err))

})

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))

})

router.post('/celebrities/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/celebrities`))
        .catch(err => console.log(err))
});


module.exports = router;