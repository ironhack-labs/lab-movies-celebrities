// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model.js');
const Celebrity = require('../models/Celebrity.model.js');

// all your routes here
// Create movie
router.get('/movies/create', (req, res) => {
    Celebrity.find() 
      .then(celebrities => {
          res.render('movies/new-movie.hbs', { celebrities });
      })
      .catch(err => {
          console.log(err);
      })
})

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    // console.log(`Your Movie is ${title}, ${genre}, ${plot}, ${cast}` )

    Movie.create({ title, genre, plot, cast })
      .then(createdMovie => {
        console.log(`Your movie ${title} has been created`);
        res.redirect('/movies');
      })
      .catch(err => {
        console.log("Error creating the Movie",err);
        res.render('movies/new-movie')
      })
})

// Get movies
router.get('/movies', (req, res) => {
    Movie.find()
      .then(movies => {
          res.render('movies/movies', { movies })
      })
      .catch(err => console.log(err));
})

//get movie details
router.get('/movies/:id', (req, res) => {
  const id = req.params.id;

  Movie.findById(id)
    .populate('cast')
    .then(movie => {
      res.render('movies/movie-details', { movie })
    })
    .catch(err => console.log(err))
})

//delete a movie 
router.post('/movies/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndDelete(id)
    .then(deletedMovie => {
      console.log("Movie has been deleted: ", deletedMovie);
      res.redirect('/movies');
    })
    .catch(err => next(err));
})

//Edit movie
router.get('/movies/:id/edit', async (req, res, next) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id).populate('cast');
    const celebrities = await Celebrity.find();
    const celebritiesNotInCast = filterCelebritiesNotInCast(movie, celebrities);

    res.render('movies/edit-movie', { movie, celebritiesNotInCast })
  } catch (err) {
    console.log(err);
  }
})

router.post('/movies/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const { title, genre, plot, cast } = req.body;

  const movie = {title, genre, plot, cast}

  Movie.findByIdAndUpdate(id, movie)
    .then(createdMovie => {
      res.redirect(`/movies/${id}`);
    })
    .catch(err => next(err));
})

function filterCelebritiesNotInCast(movie, celebrities) {
  return celebrities.filter(celebrity => {
    movie.cast.forEach(movieCelebrity => {
      if (movieCelebrity.name === celebrity.name) {
        return false
      }
    })
    return true
  })
}

module.exports = router;