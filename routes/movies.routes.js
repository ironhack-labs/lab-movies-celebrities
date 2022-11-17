// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/", (req, res) => {
  Movie.find().then((movies) => {
    res.render("./movies/movies", { movies: movies });
  });
});

router.get("/create", (req, res) => {
  Celebrity.find().then((data) => {
    res.render("./movies/new-movie", { casts: data });
  });
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.log("Celebrities", cast);
  Movie.create({ title: title, genre: genre, plot: plot, cast: cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
      res.render("./movies/new-movie");
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate({ path: "cast", model: "Celebrity" })
    .then((data) => {
      res.render("./movies/movie-details", { data: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/delete", (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movieData) => {
      Celebrity.find().then((celebrityData) => {
        res.render("./movies/edit-movie", { movieData, celebrityData });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/edit", (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(id, {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  }).catch((err) => {
    res.redirect("/movies/movie-details");
  });
});

module.exports = router;
