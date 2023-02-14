const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//GET "/movies/create"

router.get("/create", async (req, res, next) => {
    try {
        const response = await Celebrity.find().select("name")

        res.render("movies/new-movies.hbs", {
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
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
      });
  
      res.redirect("/movies");
    } catch (err) {
      next(err);
    }
  });
  

//GET "/movies"

router.get("/", async (req, res, next) => {

    try {
  
      const response = await Movie.find()
  
      res.render("movies/movies.hbs", {
        eachMovie: response
      })
  
    }catch(err) {
      next(err)
    };
  
  });

//GET "/movies/:id/details"
router.get("/:id/details", async (req, res, next) => {

    try {
        const { id } = req.params;

        const movieDetails = await Movie.findById(id).populate("cast")
        res.render("movies/movie-details.hbs", {
            movieDetails: movieDetails
        })

    }catch (error) {
        next(error);
      }
})


module.exports = router;