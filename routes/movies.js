// starter code in both routes/movies.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");

router.get("/movies", (req, res, next) => {
  return Movie.find()
    .then((movies) => {
      console.log("Retrieved movies from DB:", movies);
      res.render("movies/movies.hbs", { movies });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});


router.get("/movies/create", (req, res) => {
  Celebrity.find().then((celebrities) => res.render("movies/new-movie", {celebrities}))
});

///////////////////////////////////////////////////////////////////////////

// POST route to save a new movie to the database
router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((error) => next(error));
});

router.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id).populate('cast').then((movie) => res.render("movies/movie-details", {title, genre, plot, cast} = movie))
});

router.post("/movies/:id/delete", (req, res, next) => {
  console.log(req.params.id)
  Movie.findByIdAndRemove(req.params.id)
  .then(() => res.redirect('/movies'))
  .catch(error => next(error));
});


router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => { res.render("movies/edit-movie", { id, title, genre, plot, cast } = movie)})
    .catch(error => next(error));
});

router.post('/movies/:id/edit', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast }, { new: true })
    .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`)) // go to the details page to see the updates
    .catch(error => next(error));
});

module.exports = router;
