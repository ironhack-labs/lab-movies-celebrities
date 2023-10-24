// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

// all your routes here
router.get("/create", async (req, res) => {
    const allCelebs = await CelebModel.find();
    res.render("movies/new-movie.hbs", { allCelebs });
});
router.post("/create", async (req, res) => {
    console.log(req.body);
    const newMovie = await MovieModel.create(req.body);
    console.log(newMovie);
    res.redirect("/movie/movies");
});
router.get("/movies", async (req, res) => {
    try {
        const allMovies = await MovieModel.find().populate("cast");
    res.render("movies/movies.hbs");
    } catch (err) {
        console.log(err);
    }
});

router.get("/:movieId", async (req, res) => {
    try {
    const {movieId} = req.params;
    const oneMovie = await MovieModel.findById(movieId).populate("cast");
    console.log(oneMovie);
    res.render("movies/movie-detail.hbs", {oneMovie});
    } catch (err) {
        console.log(err);
    }
});

router.post("/:movieId/delete", async (req, res) => {
    try{
        const {movieId} = req.params;
        await MovieModel.findByIdAndDelete(movieId);
        res.redirect("/movie/movies");
    } catch (err) {
        console.log(err);
    }
    });

router.get("/:movieId/edit", async (req, res) => {
    try{
        res.render("movies/edit-movie.hbs");
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;