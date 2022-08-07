const router = require("express").Router();
const movieModel = require("../models/Movie.model");
const celebrityModel = require("../models/Celebrity.model");

// ADD MOVIES
router.get("/create", (req, res) => {
  celebrityModel
    .find()
    .then((celebArr) => {
      res.render("movies/new-movie", { celebArr });
    })
    .catch((err) => console.log("Ups, that didn't work", err));
});

router.post("/create", (req, res) => {
  console.log(req.body);
  movieModel
    .create(req.body)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log("Oh, adding a movie did not work.", err));
});

//LIST ALL MOVIES OF THE DB
router.get("/", (req, res) => {
  movieModel
    .find()
    .then((allMovies) => {
      res.render("movies/movies", { allMovies });
    })
    .catch((err) =>
      console.log("Well, that's probably not what you expected, huh?", err)
    );
});

// DETAILS PAGE
router.get("/:id", (req, res) => {
  movieModel
    .findById(req.params.id)
    .populate("cast")
    .then((selectedMovie) => {
      //   console.log(selectedMovie);
      const { _id, title, genre, plot, cast } = selectedMovie;
      res.render("movies/movie-details", { _id, title, genre, plot, cast });
    })
    .catch((err) =>
      console.log("Displaying the movie details failed, sorry.", err)
    );
});

// DELETE A MOVIE
router.post("/:id/delete", (req, res) => {
  movieModel
    .findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log("Catched an Error", err));
});

// UPDATE A MOVIE
router.get("/:id/edit", (req, res) => {
  movieModel
    .findById(req.params.id)
    .populate("cast")
    .then((selectedMovie) => {
      const { _id, title, genre, plot, cast } = selectedMovie;
      celebrityModel
        .find()
        .then((celebArr) => {
          console.log(selectedMovie);
          res.render("movies/edit-movie", {
            _id,
            title,
            genre,
            plot,
            cast,
            celebArr,
          });
        })
        .catch((err) => console.log("Nope, not today", err));
    });
});

router.post("/:id/edit", (req, res) => {
  console.log(req.body);
  const { title, genre, plot, cast } = req.body;
  movieModel
    .findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then(() => res.redirect(`/movies/${req.params.id}`))
    .catch((err) => console.log("NO UPDATE", err));
});

module.exports = router;
