const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => next(err));
});

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => {
      console.log(err);
      res.redirect(`/movies`);
    });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies`);
    })
    .catch((err) => {
      console.log(err);
      res.redirect(`/movies/create`);
    });
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movies) => {
      res.render("movies/movie-details", movies);
    })
    .catch((err) => next(err));
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect(`/movies`);
    })
    .catch((err) => next(err));
});

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  let data;
  let restCast = [];
  Movie.findById(id)
    .populate("cast")
    .then((movies) => {
      data = movies;
      Celebrity.find().then((celebrities) => {
        celebrities.map((celEl) => {
          data.cast.map((castEl) => {
            !castEl._id.equals(celEl._id) ? restCast.push(celEl) : false;
          });
        });
        data.restCast = [...new Set(restCast)];
        res.render("movies/edit-movie", data);
      });
    })
    .catch((err) => next(err));
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies`);
    })
    .catch((err) => next(err));
});

module.exports = router;
