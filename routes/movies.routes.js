const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movies = require('../models/Movies.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("movies");
});


router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
  .then((celebrities) => {
    res.render("movies/new-movie", celebrities);
  }).catch((error) => {
    console.log(error)
    res.redirect("movies/new-movie")
  })
});

router.post("/movies/create", (req, res, next) => {
  // console.log(req.body);
  const { name, ocupation, catchPhrase } = req.body;

  Movies.create({ name, ocupation, catchPhrase })
    // .then(bookFromDB => console.log(`New book created: ${bookFromDB.title}.`))
    .then(() => res.redirect("/movies/create"))
    .catch((error) => res.redirect("movies/new-movie"));
});
  
router.get("/movies", (req, res, next) => {
  return Movies.find().populate('cast')
    .then((allTheMoviesFromDB) => {
      res.render("movies/movies.hbs", { movies: allTheMoviesFromDB });
    })
    .catch((error) => {
console.log(error)    });
});


// Get movie details
router.get("/movies/:id", (req, res) => {
  const id = req.params.id

  Movie.findById(id)
  .populate("cast")
  .then(movie => {
      res.render("movies/movie-details", { movie })
  })
  .catch(err => {
      console.log(err)
  })
})

// Delete movie
router.post("/movies/:id/delete", (req, res, next) => {
  const id = req.params.id

  Movie.findByIdAndRemove(id)
  .then(deletedMovie => {
      res.redirect("/movies")
  })
  .catch(err => {
      next(err)
  })
})

// Edit movie
router.get("/movies/:id/edit", async (req, res, next) => {
  const id = req.params.id

  try {
      const movie = await Movie.findById(id).populate("cast")
      const celebrities = await Celebrity.find()
      const celebritiesNotInCast = filterCelebritiesNotInCast(movie, celebrities)

      res.render("movies/edit-movie", { movie, celebritiesNotInCast })
  } catch (error) {
      console.log(error)
  }
})

router.post("/movies/:id/edit", (req, res, next) => {
  const id = req.params.id
  const { title, genre, plot, cast } = req.body

  const movie = {
      title,
      genre,
      plot,
      cast
  }

  Movie.findByIdAndUpdate(id, movie)
  .then(createdMovie => {
      res.redirect(`/movies/${id}`)
  })
  .catch(err => {
      next(err)
  })
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