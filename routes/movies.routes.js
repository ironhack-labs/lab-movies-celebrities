const router = require("express").Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((error) => {
      console.log("Error when listing movies", error);
      next(error);
    });
});

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => {
      console.log("Error when searching celebrities", error);
      next(error);
    });
});

router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((error) => {
      console.error("Error when creating movie", error);
      res.render("movies/new-movie");
    });
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id);
    const celebrities = await Celebrity.find({ _id: { $in: movie.cast } });
    res.render("movies/movie-details", { movie: movie, celebrities: celebrities });
  } catch (error) {
    console.error("Error when getting movie", error);
  }
});

module.exports = router;
