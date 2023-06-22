const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

/* GET Movies page */
router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.render("error", { error });
    });
});

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
      console.log("Error: ", err);
      res.render("error", { err });
    });
});

router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const newMovie = new Movie({
    title,
    genre,
    plot,
    cast
  });
  // Saving the new movie to the database
  newMovie.save()
    .then(() => {
      res.redirect("/movies");
    })
    .catch(error => {
      console.log("Error: ", error),
      res.render("movies/new-movie", { error });
    });
});

router.get('/:id', (req, res, next) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate('cast') // Populate the cast array with celebrity data
    .then(movie => {
      res.render('movies/movie-details', { movie });
    })
    .catch(error => {
      console.log("Error: ", error),
      res.render("movies", { error });
    });
});

router.post('/:id/delete', (req, res, next) => {
  const movieId = req.params.id;

  Movie.findByIdAndRemove(movieId)
    .then(() => {
      res.redirect('/movies');
    })
    .catch(error => {
      console.log("Error: ", error),
      res.render("movies/movie-details", { error });
    });
});

router.get('/:id/edit', (req, res, next) => {
  const movieId = req.params.id;

  Promise.all([Movie.findById(movieId), Celebrity.find()])
    .then(([movie, celebrities]) => {
      res.render('movies/edit-movie', { movie, celebrities });
    })
    .catch(error => {
      console.log('Error: ', error);
      res.render('error', { error });
    });
});

router.post('/:id', (req, res, next) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies/${movieId}`);
    })
    .catch(error => {
      console.log('Error: ', error);
      res.render('error', { error });
    });
});


module.exports = router;
