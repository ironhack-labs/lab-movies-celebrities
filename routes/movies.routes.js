const express = require('express');
const router = express.Router();
module.exports = router;


const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')


router.get('/', (req, res) => {
    Movie
        .find()
        .then(movie => {
            res.render('movies/movies', { movie })
        })
        .catch(err => console.log(err))



})

router.get('/create', (req, res) => {
    res.render('movies/new-movie')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect(`/movies`))
        .catch(err => console.log(err))

})

router.get('/:celebrity_id/edit', (req, res) => {
    const { celebrity_id } = req.params
    Celebrity
        .findById(celebrity_id)
        .then(celebrity => res.render('celebrities/edit-celebrity', celebrity))
        .catch(err => console.log(err))

})


router.post('/:movie_id/edit', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    const { celebrity_id } = req.params
    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
        .then(celebrity => res.redirect(`/movies`))
        .catch(err => console.log(err))

})


router.post('/:movie_id/delete', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndDelete(celebrity_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})