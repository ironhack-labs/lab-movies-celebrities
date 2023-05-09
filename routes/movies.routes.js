const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");

router.get("/movies/create", (req, res) => {
  async function findAllCelebritiesFromDb() {
    try {
      // Find all the celebrities in the Db
      let allCelebritiesFromDb = await Celebrity.find();
      // Feedback 
      console.log("Retrieved Celebrities from DB:", allCelebritiesFromDb);

      // Render the form for creating a new movie 
      res.render("movies/new-movie.hbs", { celebrities: allCelebritiesFromDb });
    } catch (error) {
      console.log(error);
    }
  }
  findAllCelebritiesFromDb();
});

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  async function createMovieInDb() {
    try {
      let createdMovie = await Movie.create({
        title,
        genre,
        plot,
        cast,
      });

      res.redirect("/movies");
    } catch (error) {
      console.log(error);
    }
  }
  createMovieInDb();
});

module.exports = router;
