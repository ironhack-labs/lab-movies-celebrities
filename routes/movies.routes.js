const CelebrityModel = require("../models/Celebrity.model");
const movieModel = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get("/movies", (req, res) => {
    movieModel.find()
      .then((movies) => {
        console.log("Movies found in db: ", movies);
  
        res.render("movies/movies", { movies });
      })
      .catch((error) => {
        console.log(
          "Something went wrong while getting movies list: ",
          error
        );
      });
  });

router.get("/movies/create", (req, res) => {
    CelebrityModel.find()
    .then((celebrities) =>{
        console.log(celebrities);
        res.render("movies/new-movie", {celebrities});
    })
    
  });
  
  router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body;
    movieModel.create({ title, genre, plot, cast })
      .then((result) => {
        console.log("new Movie was created: " + result);
        res.redirect("/movies");
      })
      .catch((error) => {
        console.log("An error occured while creating a New Movie: " + error);
        res.render("/movies/new-movie");
      });
  });

module.exports = router;
