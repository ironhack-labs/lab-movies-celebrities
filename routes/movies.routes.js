const router = require("express").Router();
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res, next) => {

    Movie.find()
        .populate("celebs")
        .then((celebArr) => {
            res.render("movies/new-movie", {celebs: celebArr});    
        })
        .catch(err => consolelog("Error finding celebs", err))
  });
  
  router.post("/movie/create", (req, res, next) => {
    const celebDetails = {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    };
  
    movie.create(celebDetails)
      .then((celeb) => {
        res.redirect("/");
      })
      .catch((err) => res.render("celebrities/new-celebrities"));
  });

module.exports = router;