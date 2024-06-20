// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require("../models/Celebrity.model")

// all your routes here
router.get("/", async (req, res, next) => {
  const movies = await Movie.find().populate('cast')

  res.render("movies/movies", { movies });
});

router.get('/create', async (req, res) => {
  const movies = await Movie.find()
  const celebrities = await Celebrity.find()

  res.render('movies/new-movie', { movies, celebrities })
})


router.post('/create', (req, res, next) => {
  const { title, genre, plot, cast } = req.body

  Movie.create(
    { title, genre, plot, cast }
  ).then((docs) => {
    res.redirect("/movies")
  })
    .catch((err) => console.log(err)
    )
})

router.get('/:id', (req, res) => {
  Movie.findById(req.params.id).populate('cast')

    .then((movie) => {
      res.render('movies/movie-details', movie)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/:id/delete', (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies")
    })
    .catch(err => { console.log(err) })
})

router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  Movie.findById(id).populate('cast')
  .then((movieId)=>{
    res.render('movies/edit-movie', movieId)
  })
  .catch((err)=>{
    console.log(err)
  })


})

module.exports = router;