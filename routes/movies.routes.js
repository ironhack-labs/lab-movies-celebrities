// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const MovieModel = require("../models/Movie.model");
const CelebrityModel = require("../models/Celebrity.model");


// route to display the new celebrity form / creation 
router.get("/create", async (req,res) => {
    const celebrities = await CelebrityModel.find();
    res.render("movies/new-movie", {celebrities});
});

// route to post /submit the new celebrity 
router.post("/create", async (req,res) => {
    try {
        const newMovie = await MovieModel.create(req.body);
        res.redirect("/movies/movies");
    }
    catch (err) {
        console.log(err);
        res.redirect("/movies/new-movie")};
});


// route to disaplay the list of created celebrities 
router.get("/movies", async (req,res) => {
    try {
        const allMovies = await MovieModel.find();
        console.log(allMovies);
        res.render("movies/movies", {allMovies});
    }
    catch (err) {
        console.log(err)};
});




module.exports = router;



