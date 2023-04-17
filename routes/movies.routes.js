const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//GET Movies
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.render("movies/movies", { movies });
});

// GET create
router.get("/create", async (req, res) => {
  const celebrities = await Celebrity.find();
  res.render("movies/new-movie", { celebrities });
});

// POST create
router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findOne({ title, genre, plot, cast })
    .then((result) => {
      if (!result) {
        Movie.create({ title, genre, plot, cast }).then(() =>
          res.redirect("/movies")
        );
      } else {
        res.render("movies/new-movies", {
          message: "It seems it is already created",
        });
        return;
      }
    })
    .catch((err) => {
      console.log(`Error while creating a new user: ${err}`);
    });
});

// GET movie detail

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate("cast");
  res.render("movies/movie-details", { movie });
});

// POST delete
router.post("/:id/delete", async (req, res) => {
  console.log("1");
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (e) {
    console.error(e);
  }
});
module.exports = router;
