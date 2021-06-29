const router = require("express").Router();

const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model"); 

router.get("/movies/create", async (req, res) => {
    const allCelebrities = await Celebrity.find();
    res.render("movies/new-movie", {allCelebrities});
});

router.post("/movies/create", async (req, res) => {
    const {genre, plot, cast, title} = req.body;
    await Movie.create({
        title,
        genre,
        plot,
        cast
    });
    res.redirect("/movies");
});

router.get("/movies", async (req, res) => {
    const allMovies = await Movie.find();
    res.render("movies/movies", {allMovies});
});

router.get("/movies/:id", async (req, res) => {
    const movieDetail = await Movie.findById(req.params.id).populate("cast"); 
    res.render("movies/movie-details", movieDetail);
});

router.post("/movies/:id/delete", async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.redirect("/movies");
    }
    catch(e) {
        console.log(e);
    }
});

router.get("/movies/:id/edit", async (req, res) => {
    const movieDetail = await Movie.findById(req.params.id).populate("cast");
    const allCelebrities = await Celebrity.find();

    res.render("movies/edit-movie", {movieDetail, allCelebrities}); 
});

router.post("/movies/:id/edit", async (req, res) => {
    const {genre, plot, cast, title} = req.body;
    await Movie.findByIdAndUpdate(req.params.id, {
        title,
        genre,
        plot,
        cast
    });
    res.redirect("/movies");
});

module.exports = router;