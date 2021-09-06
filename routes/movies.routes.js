// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

const Movie = require("../models/movie.model");

const celebrities = require("../models/Celebrity.model");

// all your routes here

router.get("/create", (req, res) => {
  celebrities
    .find()

    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => console.log(err));
});
router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  if (title.length === 0 || genre.length === 0 || plot.length === 0) {
    // Si la contraseña está vacía
    res.render("movies/new-movie", {
      errorMsg: "Rellena los campos",
    });
    return;
  }

  Movie.create({ title, genre, plot, cast })

    .then(() => {
      res.redirect("/movies");
    })
    .catch(() => res.render("movies/new-movie"));
});

// enrutado pagina celebrities

router.get("/", (req, res, next) => {
  Movie.find()

    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => console.log(err));
});

// enrutado para id movies

router.get("movies-details", (req, res) => {
  const { cast } = req.params;
  console.log("NO ARRIESGO =====>", cast);

  Movies.findById(movies)
    .populate("movies")
    .then((theMovies) => res.render("movies/details", theMovie))
    .catch((err) => console.log(err));
});

module.exports = router;
