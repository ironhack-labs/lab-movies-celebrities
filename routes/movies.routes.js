const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", async (req, res) => {
    const allCast = await Celebrity.find().sort({name: 1})
    res.render("movies/new-movie", {allCast});
});

router.post("/movies/create", async (req, res)=>{
    const {title, genre, plot , cast} = req.body;
    await Movie.create ({
        title,
        genre,
        plot,
        cast,
    });
    res.redirect("/movies");
});

router.get("/movies", async (req, res) =>{
    const allMovies = await Movie.find();
    res.render("movies/movies", {allMovies});
});

router.get("/movies/:id", async (req, res) =>{
    const movieDetail = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", movieDetail);
});

router.post("/movies/:id/delete", async (req, res) =>{
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
});

router.get("/movies/:id/edit", async (req, res) =>{
    const movieToEdit = await Movie.findById(req.params.id);
    const allCast = await Celebrity.find().sort({name: 1});

    res.render("movies/edit-movie", {movieToEdit, allCast});
});
 
//fills in the spaces automatically when u press the book link
 router.post("/movies/:id/edit", async (req, res) =>{
    const {title, genre, plot, cast} = req.body;
    await Movie.findByIdAndUpdate(req.params.id, {
        title,
        genre,
        plot, 
        cast,
    });
    res.redirect("/movies");
});

module.exports = router;