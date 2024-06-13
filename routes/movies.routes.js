// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = express();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//GET
router.get("/", async (req, res) => {
  try {
    const dataFromDB = await Movie.find();
    res.render("movies/movie.hbs", { movies: dataFromDB });
  } catch (error) {
    res.json({ message: "error" });
  }
});

//GET - /movies/create - form for creating movies
router.get("/create", async (req, res) => {
  try {
    const allCelebs = await Celebrity.find();
    res.render("movies/new-movie.hbs", { celebrities: allCelebs });
  } catch (error) {
    res.json({ message: "errorrr" });
  }
});

//POST - /movies/create - send data from form to db (POST request)
router.post("/create", async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    res.render("movies/new-movie");
  }
});

//get by id
router.get("/:movieId", async (req, res) => {
  const movieId = req.params.movieId;

  Movie.findById(movieId)
    .populate("cast")
    .then((foundMovie) => {
      res.render("movies/movie-details", { foundMovie });
    });
});

//delete by id
router.post("/:movieId/delete", (req, res) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      res.json({ message: "error" });
    });
});

//edit (CRUD)
router.get("/:id/edit", (req, res) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      Celebrity.find()
        .then((celebrities) => {
          res.render("movies/movie-edit", { movie, celebrities });
        })
        .catch((celebritiesError) => {
          res.status(500).send("internal server error");
        });
    })
    .catch((movieError) => {
      res.status(500).send("internal server error");
    });
});

router.post("/:id/edit", (req, res) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .populate("cast")
    .then(() => {
      res.redirect(`/movies/${movieId}`);
    })
    .catch((error) => {
      res.status(500).send("internal server error");
    });
});

module.exports = router;
