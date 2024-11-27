// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/", (req, res) => {
    Movie.find()
    .then((data) => {
        res.render("movies/movies", { movies: data });

    })
    .catch((error) => console.log(error))
});

router.get("/create", (req, res) => {
    Celebrity.find().then((data) => {
      res.render("movies/new-movie", { celebrities: data});  
    })
    .catch((error) => console.log(error));
  });

router.post("/create", (req, res) => {
    Movie.create(req.body)
    .then(() => {
        res.redirect("/movies");
    })
    .catch((error) => {
        console.log(error);
        res.render("movies/new-movie")
    });
  });
  
module.exports = router;