// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// /movies/create	GET	Show a form to create a movie
router.get("/create", (req, res) => {
  Celebrity.find()
    .then((dbCelebrity) => {
      //console.log(dbCelebrity);
      res.render("movies/new-movie.hbs", { dbCelebrity });
    })
    .catch((err) =>
      console.log(`Err while displaying post input page: ${err}`)
    );
});
// /movies/create	POST	Send the data from the form to this route to create the movie

router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  let movie;
  //create an instance of the movie model
  Movie.create({ title, genre, plot, cast })
    .then((createdMovie) => {
      //console.log(movie);
      movie = createdMovie;
      return Movie.findByIdAndUpdate(createdMovie._id, {
        $push: { cast: cast },
      });
    })
    .then(() => res.render("movies/movies.hbs", { movie }))
    .catch((err) => {
      res.render("movies/new-movie.hbs");
      next(err);
    });
});

///movies	GET	Show all movies
router.get("/movies", (req, res) => {
  Movie.find()
    .then((movie) => {
      res.render("movies/movies.hbs", { movie });
    })
    .catch((err) => {
      next(err);
    });
});

//movies details
router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId)
    .populate("cast")
    .then((movieDetail) => res.render("movies/movie-details.hbs", movieDetail))
    .catch((err) => {
      console.log(`Err while getting a single movie from the  DB: ${err}`);
      next(err);
    });
});

//movies delete
router.post("/:movieId/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const { movieId } = req.params;

  Movie.findByIdAndRemove(movieId)
    .then(() => res.redirect("/movies/movies"))
    .catch((error) => next(error));
});

///movies/:id/edit	GET	Show a form to edit a movie
router.get("/:movieId/edit", (req, res, next) => {
  let movieId = req.params.movieId;
  console.log(movieId);
  Movie.findById(movieId)
    .populate("cast")
    .then((movieDetail) => res.render("movies/edit-movie.hbs", movieDetail))
    .catch((err) => {
      console.log(`Err while getting a single movie from the  DB: ${err}`);
      next(err);
    });
});

///movies/:id/edit	POST	Send the data from the form to this route to update the specific movie
router.post("/:movieId/edit", (req, res, next) => {
  let movieId = req.params.id;

  const { name, propellers, maxSpeed } = req.body;
  console.log(req.body);
  Drone.findByIdAndUpdate(
    droneId,
    { name, propellers, maxSpeed },
    { new: true }
  )
    .then((updatedDrone) => res.redirect(`/drones`))
    .catch((error) => res.redirect("/drones/:id/edit"));
});

module.exports = router;
