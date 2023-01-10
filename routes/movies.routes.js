const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

//POST for the create a new movie
router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  MovieModel.create({ title, genre, plot, cast })
    .then((result) => {
      console.log("new Movie was created: " + result);
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("An error occured while creating a New Movie: " + error);
      res.render("/movies/new-movie");
    });
});

router.post("/movies/:movieId/delete", (req, res) => {
  const { movieId } = req.params;

  MovieModel.findByIdAndRemove(movieId)
    .then((movie) => {
      console.log(movie + "was deleted.");
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Something went wrong while deleting the movie: ", error);
    });
});

router.post("/movies/:movieId/edit", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  const { movieId } = req.params;

  MovieModel.findByIdAndUpdate(movieId, { title, genre, plot, cast }).then(
    (movie) => {
      console.log("Movie successfully updated! Details: ", movie);

      res.redirect(`/movies/${movieId}`);
    }
  );
});

//list of the movies
router.get("/movies", (req, res) => {
  MovieModel.find()
    .then((movies) => {
      console.log("Movies found in db: ", movies);

      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      console.log("Something went wrong while getting movies list: ", error);
    });
});

//create a new movie
router.get("/movies/create", (req, res) => {
  CelebrityModel.find().then((celebrities) => {
    console.log(celebrities);
    res.render("movies/new-movie", { celebrities });
  });
});

router.get("/movies/:movieId", (req, res) => {
  const { movieId } = req.params;

  MovieModel.findById(movieId)
    .populate("cast")
    .then((movie) => {
      console.log("Movie found: ", movie);

      res.render("movies/movie-details", movie);
    })
    .catch((error) => {
      console.log("An error occured while getting movie details: ", error);
    });
});

router.get("/movies/:movieId/edit", (req, res) => {
  const { movieId } = req.params;

  const movie = MovieModel.findById(movieId).populate("cast");

  const celebrities = CelebrityModel.find();

  Promise.all([movie, celebrities])
    .then((result) => {
      const [movie, celebrities] = result;

      const cast = {};

      for (const actor of movie.cast) {
        cast[actor.name] = true;
      }

      for (let i = 0; i < celebrities.length; i++) {
        const celebrity = celebrities[i].name;
        if (cast[celebrity]) {
          celebrities[i].isInCast = true;
        }
      }

      res.render("movies/edit-movie", { celebrities, movie });
    })
    .catch((err) => {
      console.log("An error occurred while editing movie details: ", err);
    });
});

module.exports = router;
