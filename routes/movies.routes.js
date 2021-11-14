// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Movie= require("../models/movies.model")

const router = require("express").Router();



// all your routes here
router.get('/create', (req, res, next) => {
    Movie.find()
        .then(allCelebrities => {
            res.render('movies/new-movie', { allCelebrities })
        })
        .catch(err => {
            res.render("movies/new-movie", { err })
        })
        
});


router.post('/movies/create', (req, res, next) => {
    Movie.create({
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast
    })
      .then(movie => {
        res.redirect("/movies")
        })
      .catch(err => {
        res.render("movies/new-movie", { err })
      })
});








module.exports = router;
