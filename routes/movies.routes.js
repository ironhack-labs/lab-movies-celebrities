const router = require('express').Router();
const Movies = require('../models/Movie.model')
const Celebrity = require ("../models/Celebrity.model.js")

router.get('/movies/create', (req, res) => {
    async function findAllCelebritiesFromDb(){
        try {
            let allCelebritiesFromDb = await Celebrity.find();
            res.render('movies/new-movie', {celebrities: allCelebritiesFromDb})
        } catch (error) {
            console.log(error)
        }
    }
    findAllCelebritiesFromDb()
});

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


















module.exports = router;