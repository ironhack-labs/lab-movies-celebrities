
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require('../models/Celebrity.model')
// all your routes here


router.get("/movies/create", async (req, res) => {
    const allCelebrties = await Celebrity.find()
    res.render("movies/new-movie", {allCelebrties});
});


router.post("/movies/create", async (req, res)=>{
    const {title, genre, plot, cast} = req.body;
    await Movie.create ({
        title,
        genre,
        plot,
        cast
    });
    res.redirect("/movies");
});

router.get('/movies', async (req, res) => {
   const allMovies = await Movie.find().populate("cast");
    res.render("movies/movies", {allMovies});
})

router.get("/movies/:id", async (req, res) => {
    const movieDetail = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", {movieDetail});
});

router.post("/movies/:id/delete", async (req, res) => {
    await Movie.findByIdAndRemove(req.params.id);
    res.redirect("/movies");
  });

  

module.exports = router;