const router = require("express").Router();
const Movie = require("../models/Movie.model")

router.get("/movies/create", (req, res, next) => {
    res.render("movies/new-movie.hbs")
  });

    router.post('/movies/create', (req, res, next) => {
      const {title, genre, plot, cast} = req.body
      Movie.create({title, genre, plot, cast})
       .then(movie => {
          console.log(movie)
          res.redirect('/movies')
       })
       .catch(err => res.redirect('/movies/redirect'))
   })
   
   router.get('/movies', (req, res) => {
       Movie.find()
       .then(movie => res.render('movies/movies', {movie}))
       .catch(err => console.log(err))
   })
   
module.exports = router;