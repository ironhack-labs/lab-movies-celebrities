
const celebrity = require("../models/Celebrity.model");
const movie = require("../models/movie.model");

const router = require("express").Router();

router.get("/movies/create", (req, res, next) => {
    celebrity
    .find()
    .then(celebrityDB => 
    res.render('movies/new-movie', {celebrities :celebrityDB})
    )
})

router.post ('/movies/create', (req,res,next) => {
  const { title, genre, plot, cast } = req.body
  if (  title !== "" && genre !== "" && plot !== "" && cast !== [{}]){
      movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
      console.log(newMovie)
      res.redirect("/movies/movies");
    })
    .catch((err) => next(err));
}
})

router.get('/movies/movies', (req,res,next) => {
  movie.find()
  .then((Movies) => 
    res.render('movies/movies', {movies: Movies})
  )
  .catch(err => next(err))
})


router.get('/movies/:movieId' , (req,res,next) => {
  const {movieId} = req.params;
  movie
  .findById(movieId)
  .populate('cast')
  .then(movieFound => {
    console.log (movieFound) 
      res.render('movies/movie-details', { movie: movieFound })
    }
    )
      .catch(err => next(err))
})

router.get("/movies/:movieId/edit", (req, res, next) => {
  const {movieId} = req.params
  movie.findById(movieId)
  .then(movieEdit => { celebrity.find()
    .then(data => {
    res.render("movies/edit-movie",{movie:movieEdit, cast:data})
    console.log(data)
    })
  })
})

router.post('/movies/:movieId/edit', (req,res,next) => {
  const { movieId } = req.params
  const { title, genre, plot, cast } = req.body

  movie.findByIdAndUpdate(movieId, { title, genre, plot, cast } , { new:true })
      .then(movieUpdated => res.redirect(`/movies/${movieUpdated._id}`))
      .catch(err => next(err))
})

router.post("/movies/:movieId/delete" , (req,res,next) => {
  const {movieId} = req.params
  movie.findByIdAndRemove(movieId)
  .then(()=> res.redirect("/movies/movies"))
  .catch(err => next(err))
})


module.exports = router;