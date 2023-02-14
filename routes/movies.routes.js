const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//GET "/movies/create"

router.get("/create", async(req, res, next) => {
    try {
        const response = await Celebrity.find().select("name")

        res.render("movies/new-movie.hbs", {
            allCelebrities: response
        });

    } catch(err) {
        next(err)
    }
   
  });
  
  //POST "/movies/create"
  
  router.post("/create", async (req, res, next) => {
    try {
      const response = await Movie.insertMany({
        title: req.body.title,
        genre: req.body.title,
        plot: req.body.plot,
        cast: req.body.cast,
      });
  
      res.redirect("/celebrities");
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;