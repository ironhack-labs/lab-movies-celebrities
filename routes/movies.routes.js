const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model');


router.get('/create', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('movies/new-movie', { title: 'Create a New Movie', celebrities });
        })
        .catch(err => {
            res.send('err');
        });
});



router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
        .then(newMovie => {
            res.redirect('/movies');
        })
        .catch(err => {
            res.send('err');
        });
});



router.get('/', (req, res) => {
    Movie.find().populate('cast')
      .then((movies) => {
        res.render('movies/movies', { title: 'All Movies', movies });
      })
      .catch((err) => {
        console.log(err)
      });
  });
  

  router.get('/:id', (req, res) => {
    const movieId = req.params.id;
    
    Movie.findById(movieId).populate('cast')
      .then((movie) => {
        
        res.render('movies/movie-details', { title: movie.title, movie });
      })
      .catch((err) => {
        console.log(err)
      });
  });
  

router.get('/:id/edit', (req, res) => {   
    const movieId = req.params.id;
    
    Movie.findById(movieId)
      .then((movie) => {
        console.log(movie); ///////////////
        Celebrity.find()
          .then((celebrities) => {
            res.render('movies/edit-movie', { title: `Edit ${movie.title}`, movie, celebrities });
          })
          .catch((celebritiesError) => {
            console.error(celebritiesError);
          });
      })
      .catch((movieError) => {
        console.error(movieError);
      });
  });

  router.post('/:id/delete', (req, res) => {
    const movieId = req.params.id;
  
    Movie.findByIdAndRemove(movieId)
      .then(() => {
        res.redirect('/movies');
      })
      .catch((err) => {
        console.log(err)
      });
  });


  router.post('/:id', (req, res) => {
    const movieId = req.params.id;
  
    const updatedMovie = {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
    };
  
    Movie.findByIdAndUpdate(movieId, updatedMovie)
      .then(() => {
        res.redirect(`/movies/${movieId}`);
      })
      .catch((err) => {
       console.log(err)
      });
  });
  
  
module.exports = router;