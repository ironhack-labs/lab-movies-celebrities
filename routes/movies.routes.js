// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//Require The Model
const Movies = require("../models/Movie.model.js");


// Create the following GET route: /movies/create
router.get("/movies/create", (req, res) => {
    // console.log(`whatever`);
    res.render("movies/new-movie.hbs");
  });
  
  router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body;
    async function createMovie() {
      try {
        let createdMovie = await Movies.create({
          title,
          genre,
          plot,
          cast
        });
        res.redirect("/movies");
      } catch (error) {
        console.log(error);
      }
    }
  
    createMovie();
  });

// List all the movies
router.get("/movies", (req, res) => {
    async function findAllMovies() {
      try {
        let allMovies = await Celebrity.find();
        res.render("movies/movies.hbs", { movies: allMovies });
      } catch (error) {
        console.log(error);
      }
    }
    findAllMovies();
  });

module.exports = router;