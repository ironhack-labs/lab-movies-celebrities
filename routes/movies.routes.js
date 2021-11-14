const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get('/', (req, res, next) => {
  
  Movie.find()
  .then(allMovies => {
    res.render('movies/movies', { allMovies })
  })
  .catch(err => {
    res.render("movies/movies", { err })
  })
  
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params
  
    Movie.findById(id)
    .populate('cast')
    .then(movie => {
      res.render('movies/movie-details', { movie })
    })
    .catch(err => {
      res.render("movies/movies", { err })

    })
    
  });
  
  router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params
  
    Movie.findByIdAndRemove(id)
    .then(movie => {
        res.redirect("/movies")
    })
    .catch(err => {
      res.render("movies/movies", { err })
    })
    
  });


router.get('/create', (req, res, next) => {
    Celebrity.find()
        .then(allCelebrities => {
            res.render('movies/new-movie', { allCelebrities })
        })
        .catch(err => {
            res.render("movies/new-movie", { err })
        })
        
});

router.post('/create', (req, res, next) => {
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
