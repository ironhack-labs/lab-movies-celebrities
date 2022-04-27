const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');


//show form to create a movie
router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebsArr) => 
    res.render("movies/new-movie", {celebrities: celebsArr }))
    
    .catch(err => {
      console.log(err)
      next(err);
    });

});

//create movie
router.post("/movies/create", (req, res, next) => {

  const newMovies = {
    title: req.body.title,
    genre: req.body.genre,
    cast: req.body.cast,
    plot: req.body.plot
  }

  Movie.create(newMovies)
    .then(() => 
    res.redirect("/movies"))
    .catch(err => {
      console.log(err)
      next(err);
    });
});



module.exports = router; 