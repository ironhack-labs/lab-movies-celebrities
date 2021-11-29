// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// all your routes here

router.get("/create", async (req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find();
        res.render("movies/new-movie.hbs", {allCelebrities});
    } catch(err){
        console.log(err)
    }
});

router.get("/", async (req, res, next) => {
    try{
      const allMovies = await Movie.find();
      res.render("movies/movies.hbs", {allMovies})
  } catch(err){
      console.log(err)
  }
  });


router.post("/create", async (req, res, next) => {
    const {title, genre, plot, cast} = req.body
    try{
        const newMovie = await Movie.create({title, genre, plot, cast})
        res.redirect("/movies")
    } catch(err){
        console.log(err)
        res.render("movies/new-movie.hbs", {Celebrities});
    }
});

router.get("/:id", async (req, res) => {
  try {
      const selectedMovie = await Movie.findById(req.params.id).populate('cast');
      res.render("movies/movie-details.hbs", selectedMovie);
  } catch(err) {
      res.render("not-found.hbs", { errorMsg: "Movie not found" });
  }
});

module.exports = router;
