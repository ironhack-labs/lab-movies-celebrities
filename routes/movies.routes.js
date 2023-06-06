// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model");
// all your routes here

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrityArray) => {
      res.render("movies/new-movie", { celebrityArray });
    })
    .catch((e) => {
        console.log(e);
    });
});
router.post("/movies/create", (req, res, next) => {
  const newMovie = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.create(newMovie)
  .then(()=>{
    console.log(newMovie)
    res.redirect("/movies")

  })

  .catch((e) => {
    console.log(e);
  
  });
});
module.exports = router;
