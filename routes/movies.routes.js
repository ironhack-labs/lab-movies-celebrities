const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/movies/create", (req, res, next) => {
    Celebrity
    .find()
    .then(celebrityDB => 
    res.render('movies/new-movie', {celebrityDB})
    )
    .catch(err => next(err))
})

router.post ('/movies/create', (req,res,next) => {
    const { title, genre, plot, cast } = req.body
    if (  title !== "" && genre !== "" && plot !== "" && cast !== [{}]){
        Movie.create({ title, genre, plot, cast })
      .then(() => {
        res.redirect("/movies/movies");
      })
      .catch((err) => next(err));
  }
})

router.get('/movies/movies', (req,res,next) => {
    Movie.find()
    .then((Movies) => 
      res.render('movies/movies', {movies: Movies})
    )
    .catch(err => next(err))
})



router.get('/movies/:movieId' , (req,res,next) => {
    const {movieId} = req.params;
    Movie
    .findById(movieId)
    .populate('cast')
    .then(movieFound => {
      console.log (movieFound) 
        res.render('movies/movie-details', { movie: movieFound })
      }
      )
        .catch(err => next(err))
})

router.get('/movies/:movieId/edit', (req,res,next) => {
  const { movieId } = req.params

  Movie.findById(movieId)
        .then((movieToEdit) => {
        Celebrity.find()
                 .then((celebrities) =>
                  res.render('movies/edit-movie', { 
                    movie:movieToEdit,
                    cast: celebrities,
                   }))
        })
})

router.post('/movies/:movieId/edit', (req,res,next) => {
  const { movieId } = req.params
  console.log (movieId) 
  const { title, genre, plot, cast } = req.body
console.log ("Aqui error") 
  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast } , { new:true })
      .then(updatedMovie => res.redirect(`/movies/${updatedMovie._id}`))
      .catch(err => next(err))
})


router.post("/movies/:movieId/delete" , (req,res,next) => {
  const { movieId } = req.params
  Movie.findByIdAndRemove(movieId)
  .then(()=> res.redirect("/movies/movies"))
  .catch(err => next(err))
})
module.exports = router;