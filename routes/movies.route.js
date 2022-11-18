// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model.js");

// all your routes here

/* router.get("/movies", (req, res, next) => {
    res.render("movies");
  }); */
  
  /* GET Movie page */
  
  router.get("/create", (req, res, next) => {
    Celebrity.find()
          .then(dbCelebrities => {
              res.render("movies/new-movie", { celebrities: dbCelebrities })
          })
          .catch(err => console.log(err))
  });

  // create a new movie - send the form to the server
  router.post("/create", async (req, res, next) => {

    const { title, genre, plot, cast } = req.body;
    
    Movie.create({ title, genre, plot, cast });
    res.redirect(`/movies`)
    .catch(err => console.log(err)
    .then(res.redirect("movies/new-movie")))
  });
  

module.exports = router;