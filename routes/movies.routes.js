const Movies = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/movies/create", (req, res) => {
  Celebrity.find().then((celebsFromDB) => {
    res.render("./movies/new-movie.hbs", { celebsforMovies: celebsFromDB });
    console.log(celebsFromDB);
  });
});

router.post("/movies/create", (req, res) => {
  const { cast, title, genre, plot } = req.body;
  console.log(cast, title, plot, genre);
  Movies.create({ cast, title, plot, genre })
    .then((newMovie) => {
      console.log("new movie created", newMovie);
      res.redirect("/movies");
    })
    .catch((err) =>
      console.log("there was an error while creating the movie", err)
    );
});

router.get("/movies", (req, res) => {
  Movies.find()
    .then((moviesfromDB) => {
      res.render("./movies/movies.hbs", { movies: moviesfromDB });
      console.log(moviesfromDB);
    })
    .catch((err) => console.log("error while retriving the data", err));
});
router.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  console.log("this is the id from movie", id);
  Movies.findById(id)
    .populate("cast")
    .then((theMovieinfo) => {
      console.log(theMovieinfo, "info from movie");
      res.render("./movies/movie-details.hbs", { movieInfo: theMovieinfo });
    })
    .catch((err) => console.log("we couldnt get the movie from DB"));
});

router.post("/movies/:id/delete", (req, res) => {
  const { id } = req.params;
  Movies.findByIdAndDelete(id)
    .then((deletedItem) => {
      console.log("the item delete", deletedItem);
      res.redirect("/movies");
    })
    .catch((err) => console.log("delete errror", err));
});

router.get("/movies/:id/edit", (req, res) => {
  const { id } = req.params;
  Movies.findById(id)
    .populate("cast")
    .then((moviesToEdit) => {
      Celebrity.find()
        .then((celebsFromDB) => {
          console.log(celebsFromDB);
          console.log(moviesToEdit);
          //res.send(celebsFromDB);
          res.render("./movies/edit-movie.hbs", {
            edit: moviesToEdit,
            celebs: celebsFromDB,
          });
        })
        .catch((err) => ("no celeb", err));
    })
    .catch((err) => console.log("error", err));
});

router.post("/movies/:id/edit", (req, res) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  console.log(genre, title, plot, id, cast, "post");
  Movies.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
    .then((updatedMovie) => {
      console.log("are you null", updatedMovie);
      res.redirect("/movies");
    })
    .catch((err) => console.log("no update", err));
});
module.exports = router;
