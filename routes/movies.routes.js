// starter code
const router = require("express").Router();
const MovieModel = require("../models/Movie.model");
const CelebrityModel = require("../models/Celebrity.model");

// all routes
router.get("/create", (req, res, next) => {
  CelebrityModel.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => {
      console.log("error while creating a new movie:", err);
    });
});

router.post("/create", (req, res, next) => {
  console.log(req.body);
  const { title, genre, plot, cast } = req.body;
  MovieModel.create({ title, genre, plot, cast })
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("error while creating a new movie:", err);
      res.render("movies/new-movie");
    });
});

router.get("/", (req, res, next) => {
  MovieModel.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => {
      console.log("error while accessing list of all movies:", err);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  MovieModel.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) => {
      console.log("error while accessing the movie:", err);
    });
});

router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  MovieModel.findByIdAndDelete(id)
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("error while deleting the movie:", err);
    });
});

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  let movie;
  MovieModel.findById(id)
    .then((singleMovie) => {
      movie = singleMovie;
      return CelebrityModel.find();
    })
    .then((celebrities) => {
      res.render("movies/edit-movie", { movie, celebrities });
    })
    .catch((err) => {
      console.log("error while accessing the movie:", err);
    });
});

router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  MovieModel.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
    .then((movie) => {
      res.redirect(`/movies/${movie._id}`);
    })
    .catch((err) => {
      console.log("error while updatind the movie:", err);
    });
});

// exporting routes file
module.exports = router;
