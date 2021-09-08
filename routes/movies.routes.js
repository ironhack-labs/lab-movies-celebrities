const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((allCelebritiesFromDB) => {
      res.render("movies/new-movie", { celebrity: allCelebritiesFromDB });
    })
    .catch((err) =>
      console.log(`Err while displaying celebrity selection scroll: ${err}`)
    );
});

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
      console.log(`Added ${newMovie.title} as a new movie in the DB`);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(`Err while creating a new movie in the DB: ${err}`);
      res.redirect("/movies/create");
      next(err);
    });
});

router.get("/movies", (req, res) => {
  Movie.find()
    .then((allMoviesFromDB) => {
      console.log("Retrieved movies from DB:", allMoviesFromDB);
      res.render("movies/movies", {
        movie: allMoviesFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while getting the celebrities from the DB: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

router.get("/movies/:id", (req, res) => {
  const id = req.params.id;

  Movie.findById(id)
    .populate("cast")
    .then((selectedMovie) => {
      res.render("movies/movie-details", selectedMovie);
    })
    .catch((err) => {
      next(err);
      console.log(`Err while getting the movie from the DB: ${err}`);
    });
});

router.post("/movies/:id/delete", (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(`Err while deleting the movie from the DB: ${err}`);
    });
});

router.get("/movies/:id/edit", (req, res) => {
  const id = req.params.id;

  Movie.findById(id);
  Celebrity.find().then(res.render());
});

module.exports = router;
