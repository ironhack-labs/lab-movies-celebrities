const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
    Movie.find()
    .then((movies)=>{
        res.render("movies/movies", {movies});
    })
    .catch((err)=>{
        next(err);
    })
});

router.get("/new", (req, res, next) => {
    Celebrity.find()
    .then((celebrities)=>{
        res.render("movies/new-movie", {celebrities});
    })
    .catch((err)=>{
        next(err);
    })
});

router.post("/create", (req, res, next) => {
    const {title, genre, plot, celebrity, image} = req.body;

    Movie.create({title, genre, plot, celebrity, image})
    .then((result)=>{
        console.log ("A new movie was added:", result);
        res.redirect("/movies");
    })
    .catch((err)=>{
        next(err);
    })
});

router.get("/:id", (req, res, next) => {
    Movie.findById(req.params.id).populate("celebrity")
    .then((movie)=>{
        res.render("movies/movie-details", movie);
    })
    .catch((err)=>{
        next(err);
    })
});


module.exports = router;