const router = require("express").Router()

//Model
const Celebrities = require('./../models/Celebrities.model')
const Movies = require('./../models/Movies.model')

// List
router.get('/celebrities', (req, res, next) => {
    Celebrities
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log('Error:', err))
})

// Create
router.get('/celebrities-create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities-create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrities
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect(`/celebrities`))
        .catch(err => console.log('Error:', err))
})

module.exports = router;