// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model');
const Movie = require('./../models/Movie.model');

router.get("/movies", async(req, res, next) => {
    try {
      const allMovies = await Movie.find();
      res.render("movies/movies", {allMovies});
    } catch (error) {
      console.log(error);
    }
});

router.get('/movies/create', async(req, res, next) => {

    try {
      const allCelebrities = await Celebrity.find();
      res.render('movies/new-movie', {allCelebrities});
    } catch (error) {
      console.log(error);
    }

});


router.post('/movies/create', async(req, res, next) => {
  try {
    const {title, genre, plot, cast} = req.body;

    const newMovie = await Movie.create({title, genre, plot, cast});
  
    res.redirect('/movies');

  } catch (error) {
    console.log(error);
  }

});

router.get('/movies/:id', async(req, res) => {

  try {
      
    const movieId = req.params.id;

    const pickedMovie = await Movie.findById(movieId).populate("cast");

    res.render('movies/movie-details', {pickedMovie});
    
  } catch (error) {

    console.log(error);

  }
});

router.post('/movies/:id/delete', async(req, res) => {

  try {
    const movieId = req.params.id;

    await Movie.findByIdAndRemove(movieId);
  
    res.redirect("/movies");
    
  } catch (error) {
    console.log(error);
  }

});

router.get('/movies/:id/edit', async(req, res) => {

  try {
    const movieId = req.params.id;

    const pickedMovie = await Movie.findById(movieId);
    const cast = await Celebrity.find();
  
    res.render('movies/edit-movie', {pickedMovie,cast});
  } catch (error) {
    console.log(error);
  }

});

router.post('/movies/:id/edit', async(req, res) => {

  try {
    
  const movieId = req.params.id;
  const {title, genre, plot, cast} = req.body;

  await Movie.findByIdAndUpdate(movieId,{title, genre, plot, cast}, {new: true});

  res.redirect(`/movies/${movieId}`);
    
  } catch (error) {
    console.log(error);
  }
  
}); 

module.exports = router;

