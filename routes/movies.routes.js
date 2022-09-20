const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// Creating new Celebrities Routes
router.get("/create", (req, res) => {
  Celebrity.find().then((celebrities) => {
    res.render("movies/new-movie", { celebrities });
  });
});

router.post("/create", (req, res) => {
  Movie.create(req.body)
    .then(() => {
      res.redirect("/movies");
    })
    .catch(() => {
      res.render("movies/new-movie.hbs");
    });
});

// Displaying a list of all celebrities
router.get("/", (req, res) => {
  Movie.find().then((movies) => {
    res.render("movies/movies.hbs", { movies });
  });
});

// Show details for movies
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render(`movies/movie-details`, movie);
    })
    .catch((err) => console.log(err));
});

// Delete movies
router.post("/:id/delete", (req, res) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

// Editing movies
router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  const info = {};
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      info.movie = movie;
      return Celebrity.find();
    })
    .then((celebrities) => {
      info.celebrities = celebrities;
      res.render("movies/edit-movie.hbs", info);
    });
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
    .then(() => {
      res.redirect(`/movies/${id}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
