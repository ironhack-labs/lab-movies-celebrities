// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('./../models/Movie.model')
// all your routes here
router.get('/movies/create', (req, res) => {
    res.render('movies/new-movie')
})
router.post('/movies/create', (req, res, next) => {
    const { title, genre, catchphrase, cast } = req.body

    Movie
        .create({ title, genre, catchphrase, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))

});

module.exports = router;