// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/create", (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDb)=>{
        res.render("movies/new-movie", {allCelebrities: celebritiesFromDb});
    })
    .catch((err)=>{
        console.log("erreur",err)
        next(err);
    })
  });

  router.post("/create", (req, res, next) => {
    const movies = req.body
    Movie.create({
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
    })
      .then((celebrityFromDB) => {
        res.redirect("/movies");
      })
      .catch((err) => {
        next(err);
      });
  });
  


module.exports = router;
