const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model')


router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
  .then((celebData) => {
    res.render('movies/new-movie', {
      celebrityData: celebData
    });
  })
});

router.post("/movies/create", (req, res, next) => {
  Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
  })
  .then((savedMovie) => {
    console.log('New movie added');
    // res.render('movies/new-movie');
    res.redirect('/movies')
  })
  .catch((err) => {
    console.log(err);
    res.send(err)
  })
});

router.get('/movies', (req,res,next) => {
  Movie.find()
  .then((movieData) => {
      // console.log(movieData[0].cast[0])
      res.render('movies/movies', {
        movieData: movieData
      })
  })
  .catch((err) => {
    res.send(err)
  })
})

router.get('/movies/:id', (req,res,next) => {
  Movie.findById(req.params.id) 
    .populate('cast')
    .then((movieData) => {
      console.log(movieData)
      res.render('movies/movie-details', {
        movieData: movieData
      })
    })
    .catch(err => res.send(err))
})


router.post('/movies/:id/delete', (req,res,next) => {
  Movie.findByIdAndRemove(req.params.id) 
    .then(res.redirect('/movies'))
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})


router.get('/movies/:id/edit', (req,res,next) => {

  async function supplyEditData(){
    let movieInfo = await Movie.findById(req.params.id);
    let celebInfo = await Celebrity.find();
    res.render('movies/edit-movie', {
      movieData: movieInfo,
      celebData: celebInfo
    })
  }
  supplyEditData();
})

router.post('/movies/:id/edit', (req,res,next) => {

  async function updateMovie(){
    let movie = await Movie.findById(req.params.id)
      if(req.body.title){
        movie.title = req.body.title;
      }
      if(req.body.genre){
        movie.genre = req.body.genre;
      }
      if(req.body.plot){
        movie.plot = req.body.plot;
      }
      if(req.body.cast){
        movie.cast = req.body.cast;
      }
      await movie.save();
      res.redirect('/movies/' + req.params.id)
  }
  updateMovie();
})



module.exports = router;
