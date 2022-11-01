const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")

router.get("/movies/create", async (req, res, next) => {
    
    try {
        const celebrities = await Celebrity.find();
        res.render("movies/new-movie", {celebrities})
    } catch (error) {
        
    }
})

router.post("/movies/create", async (req, res, next) => {

    try {
      const {title, genre, plot, cast} = req.body;
      
      const createdMovie = await Movie.create({title, genre, plot, cast})

      res.redirect("/movies")
      console.log(createdMovie)
    } catch (error) {
      /* res.redirect("celebrities/new-celebrity") */
      console.log(error);
      next(error);
    };
});


router.get('/movies', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render("movies/movies", {movies})
    } catch (error) {
        
    }
})

router.get("/movies/:id", async (req, res, next) => {
    try {const movie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", {movie});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies", (req, res, next) => res.render("movies/movies"));


module.exports = router;


