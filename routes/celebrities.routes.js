const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')



// List of celebrities
router.get('/celebrities', (req, res, next) => {

    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})



// Create Celebrity
router.get('/celebrities/create', (req, res, next) => {

    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => res.redirect('/celebrities/new-celebrity'))

})



// Edit Celebrity

// Pero no lo edita, no lo edita, no lo edita 


router.get('/celebrities/:_id/edit', (req, res, next) => {

    const { _id } = req.params

    Celebrity
        .findById(_id)
        .then(celebrity => res.render('celebrities/edit-celebrity', celebrity))
        .catch(err => console.log(err))
})

router.post('/celebrities/:celebrity_id/edit', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body
    const { _id } = req.params

    Celebrity
        .findByIdAndUpdate(_id, { name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})



// Celebrity delete
router.post('/celebrities/:_id/delete', (req, res, next) => {

    const { _id } = req.params

    Celebrity
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})


module.exports = router