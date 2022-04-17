// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')

// all your routes here
router.get('/create', (req, res) => {
res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})

router.get('/celebrities', (req, res) => {

    Celebrity
        .find()
        .then(newCelebrity => {
            res.render('celebrities/celebrities', {newCelebrity}) 
        })
        .catch(err => console.log(err))
})

module.exports = router;

//CELEBRITY DETAILS
router.get('/celebrities/:id', (req, res) => {
    const { id } = req.params

    Celebrity
        .findById(id)
        .then(newCelebrity => {
            res.render("celebrities/celebrity-details", newCelebrity )
        })
        .catch(err => console.log(err))
})


router.get('/celebrities/:id', (req, res, next) => {
    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celeb => res.render('celebrities/celebrity-details-page', celeb))
        .catch(err => console.log('Oh! An error occurred when showing celebrity details', err))
})