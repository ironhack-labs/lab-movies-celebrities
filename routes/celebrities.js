const router = require("express").Router()

const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')

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

router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(newCelebrity => {
            res.render('celebrities/celebrities', { newCelebrity })
        })
        .catch(err => console.log(err))
})


module.exports = router