// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require ("../models/Celebrity.model.js")

// all your routes here
router.get("/movies/create", (req, res) => {
    async function findAllCelebritiesFromDb(){
        try{
            // Find all the celebs inside the collection 
            let allCelebritiesFromDb = await Celebrity.find();

  res.render("movies/new-movie", {celebrities: findAllCelebritiesFromDb});
        }
        catch(error){
        console.log(error)
        }
    }
    findAllCelebritiesFromDb()
    });

// POST route to save a new movie in database
router.post("/movies/create", (req, res) => {
  // destructuring the req.body 
  const {id} = req.params;
  const { title, genre, plot, cast } = req.body;

  async function createMovieInDb() {
    try {
      // Creating the movie in Db
      let newdMovie = await Movie.create({ title, genre, plot, cast });

      res.redirect("/movies");
    } catch (error) {
      console.log(error);
    }
  }

  createMovieInDb();
});



// GET route to retrieve and display all the movies
router.get("/movies", (req, res) => {
  async function findAllMoviesFromDb() {
    try {
      // Find all the movies inside the collection
      let allMoviesFromDb = await Movie.find();

      // Render all movie from DB with hbs view
      res.render("movies/movies.hbs", { movies: allMoviesFromDb });
    } catch (error) {
      console.log(error);
    }
  }
  findAllMoviesFromDb();
});
module.exports = router;
