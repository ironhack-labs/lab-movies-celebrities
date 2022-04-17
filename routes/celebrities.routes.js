const router = require("express").Router()

const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')


// Iteration 3 Create Celebrity 

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(newCelebrity => {
            res.redirect('celebrities')
        })
        .catch(err => {
            res.redirect('celebrities/new-celebrity')
        })
})


// Iteration 4 Listing celebrities

router.get('/celebrities', (req, res) => {

    Celebrity

        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))
})


// Bonus Celebrity details

router.get('/:id', (req, res) => {
    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrity => {
            res.render('celebrities/celebrity-details', celebrity)
        })
        .catch(err => console.log(err))
})


module.exports = router




