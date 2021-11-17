// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

/* GET create celebrity page */
router.get("/create", async (req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find();
        res.render("movies/new-movie.hbs", {allCelebrities});
    } catch(err){
        console.log(err)
    }
});

/* GET celebrities page */
router.get("/", async (req, res, next) => {
   try{
        const allMovies = await Movie.find();
        res.render("movies/movies.hbs", {allMovies})
    } catch(err){
        console.log(err)
    }
});

// GET one movie
router.get("/:id", async (req, res) => {
    try {
        const selectedMovie = await Movie.findById(req.params.id).populate('cast');
        res.render("movies/movie-details.hbs", selectedMovie);
    } catch(err) {
        res.render("not-found.hbs", { errorMsg: "Movie not found" });
    }
});

// POST edit one movie
router.get("/:id/edit", async (req, res) => {
    try{
        const selectedMovie = await Movie.findById(req.params.id);
        const allCelebrities = await Celebrity.find();
        res.render("movies/edit-movie.hbs", {selectedMovie, allCelebrities, movieCast: selectedMovie.cast})
    } catch(err){
        console.log(err)
    }
});

/* POST create celebrity page */
router.post("/create", async (req, res, next) => {
    const {title, genre, plot, cast} = req.body
    try{
        const newMovie = await Movie.create({title, genre, plot, cast})
        res.redirect("/movies")
    } catch(err){
        console.log(err)
        res.render("movies/new-movie.hbs", {allCelebrities});
    }
});

// Post delete one movie
router.post("/:id/delete", async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndRemove(req.params.id);
        res.redirect("/movies")
    } catch(err) {
        res.render("not-found.hbs", { errorMsg: "Movie not deleted" });
    }
});

// POST edit one movie
router.post("/:id", async (req, res) => {
    console.log("edit")
    const {title, genre, plot, cast} = req.body
    try {
        const editeddMovie = await Movie.findByIdAndUpdate(req.params.id, {title, genre, plot, cast});
        res.redirect(`/movies/${req.params.id}`)
    } catch(err) {
        res.render("not-found.hbs", { errorMsg: "Movie not deleted" });
    }
});



module.exports = router;