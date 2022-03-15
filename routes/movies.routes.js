// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movies.model");

// all your routes here
router.get("/movies/create", (req, res) => {
    res.render("movies/new-movie");
});

router.post("/movies/create", async (req, res) => {
    //console.log(req.body);

    try {
        const userCreatedMovie = new Movie({
            title: req.body.title,
            genre: req.body.genre,
            plot: req.body.plot,
            cast: req.body.cast,
        });

        await userCreatedMovie.save();

        res.redirect("/movies");
    } catch (err) {
        console.error(err);
        res.render("movies/new-movie");
    }

});

router.get("/movies", async (req, res) => {

    try {
        const listAllMovies = await Movie.find();
        console.log(listAllMovies);
        res.render("../views/movies/movies", { allMovies: listAllMovies });
    } catch (err) {
        console.error(err);
    }

});

module.exports = router;