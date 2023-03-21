const router = require("express").Router();
const Movies = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies", (req, res, next) => {
  Movies.find()
    .then((moviesArr) => {
      const data = {
        movies: moviesArr,
      };
      console.log(data);
      res.render("movies/movies", data);
    })
    .catch((e) => {
      console.log("Error to display list of movies", e);
    });
});

router.get("/new-movie", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesArr) => {
      const data = {
        celebrity: celebritiesArr,
      };

      res.render("movies/new-movie", data);
    })
    .catch((e) => {
      console.log("error getting movies....", e);
      next(e);
    });
});

router.post("/new-movie", (req, res, next) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movies.create(newMovie)
    .then(() => {
      res.redirect("/movies/movies");
    })
    .catch((e) => {
      console.log("error at create", e);
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  Movies.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies/movies");
    })
    .catch((e) => {
      console.log("Error deleting movie", e);
    });
});

router.get("/movies/:id/movie-details", (req, res, next) => {
  Movies.findById(req.params.id)
    .populate("cast")
    .then((moviesFromDB) => {
      const data = {
        movies: moviesFromDB
      }
      res.render("movies/movie-details", data);
    })
    .catch((e) => {
      console.log("error getting movies....", e);
      next(e);
    });
});

router.get("/movies/:id/edit", (req, res, next) => {
  let moviesEdit;
  Movies.findById(req.params.id)
    .then((moviesFromDB) => {
      moviesEdit = moviesFromDB;
      return Celebrity.find();
    })
    .then((celebritiesArr) => {
      const data = {
        movies: moviesEdit,
        celebrities: celebritiesArr,
      };
      res.render("movies/edit-movie", data);
    })
    .catch((e) => {
      console.log("error editing movies....", e);
      next(e);
    });
});

router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movies.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies/movies/${id}/movie-details`);
    })
    .catch((e) => {
      console.log("error editing movies....", e);
      next(e);
    });
});

module.exports = router;
