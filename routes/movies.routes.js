const router = require("express").Router();
const Movies = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies", (req, res, next) => {
    Movie.find()
      .then((moviesFromDB) => {
        res.render("movies/new-movie", data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  router.post("/movies/create", (req, res, next) => {
    console.log(req.body);
    res.redirect("/")

  })



module.exports = router;