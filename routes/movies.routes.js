const router = require("express").Router();
const Celebrity = require("../models/celebrity.model");
const Movie = require("../models/movie.model")


// GET - Show form to create a movie
router.get("/movies/create", (req,res) => {
  Celebrity.find()
    .then((celebritiesList) => {
      res.render("movies/new-movie", {celebritiesList});
    })
    .catch( (err) => console.log(err));
});

//POST - Send and save data from form to database
router.post("/movies/create", (req,res) => {
  const { title, genre, plot, cast } = req.body;
  console.log(req.body)

    // Check if user selected one value or multiple and normalize it
    let castArray;
    // if it is not an array make it an array 
    if (cast && !Array.isArray(cast)) {
      castArray = [cast];
    }
    // if it is an array, leave it as it is
    else if (Array.isArray(cast)) {
      castArray = cast;
    }
  console.log(castArray);

  Movie.create({ title, genre, plot, castArray })
      .then((createdMovie) => {
          res.redirect("/");
      })
      .catch( (err) => console.log(err));
});

// Show all Movies
router.get("/movies", (req, res) => {

  Movie
    .find()
    .populate('cast')
      .then((moviesList)=> {
          res.render("movies/all-movies", {moviesList});
      })
      .catch( (err) => console.log(err));
});


module.exports = router;