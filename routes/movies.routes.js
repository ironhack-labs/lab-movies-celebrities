const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) => {
  Celebrity.find().then(cast => {
    res.render("movies/new-movie", { cast });
  });
});

router.post("/create", (req, res, next) => {
  const { body } = req;
  Movie.create(body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(error => {
      console.error(error);
      res.render("movies/new-movie");
    });
});

router.get("/", (req, res, next) => {
  Movie.find().then(allMovies => {
    res.render("movies/movies", { allMovies });
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then(details => {
      res.render("movies/movie-details", { details });
    })
    .catch(error => {
      console.error(error);
    });
});

router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(error => {
      console.error(error);
    });
});

router.get("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  const cast = await Celebrity.find();
  res.render("movies/edit-movie", { movie, cast });
});

router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.redirect("/movies/" + id);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
