const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/create", (req, res) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("movies/new-movie", { allCelebrities });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/", (req, res) => {
  Movie.find()
    .then((allMovies) => {
      res.render("movies/movies", { allMovies });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((oneMovie) => {
      res.render("movies/movie-detail", oneMovie);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/:id/delete", (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:id/edit", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie", { movie, celebrities });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id/edit", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then((updateMovie) => {
        res.redirect("/movies/" + req.params.id)
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
