const router = require("express").Router();
const Movie = require("../models/Movies.models")


router.get("/movies/create", (req, res) => {
    res.render('movies/new-movie')
})

router.post('/movies/create', (req, res) => {
   const {title, } = req.body
   Movie
    .create({name, occupation, catchPhrase})
    .then(movie => res.redirect('/movies'))
    .catch(err => res.redirect('/movies/redirect'))
})

router.get('/movies', (req, res) => {
    Movie
    .find()
    .then(movie => res.render('movies/movies', {movie}))
    .catch(err => console.log(err))
})

module.exports = router;