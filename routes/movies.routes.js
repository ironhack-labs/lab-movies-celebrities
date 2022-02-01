const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
  Movie.find()
    .then((movieList) => {
      res.render("../views/movies/movies.hbs", { movieList });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrityList) => {
      res.render("../views/movies/new-movie.hbs", { celebrityList });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/create", (req, res, next) => {
  Movie.create(req.body)
    .then(res.redirect("/movies"))
    .catch((err) => {
      console.log(err);
      res.render("../views/movies/movies.hbs");
    });
});

router.get("/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      res.render("../views/movies/movie-details.hbs", { movie });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(res.redirect("/movies"))
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id/edit", (req, res, next) => {
  const movie = Movie.findById(req.params.id)
    .then((movie) => {
      return ({ title, genre, plot, cast } = movie);
    })
    .catch((err) => {
      console.log(err);
    });
  const celebrities = Celebrity.find()
    .then((celebrityList) => celebrityList)
    .catch((err) => {
      console.log(err);
    });

  Promise.all([movie, celebrities]).then((values) => {
    res.render("../views/movies/edit-movie.hbs", {
      currentValue: values[0],
      celebrityList: values[1],
    });
  });
});

router.post("/:id/edit", (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("cast")
    .then((movie) => {
      res.render("../views/movies/movie-details.hbs", { movie });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
