// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')



// all your routes here

router.get("/movies/create", async (req, res, next) => {
    const celebs = await Celebrity.find();
    res.render("movies/new-movie", {celebs})
})

router.post("/movies/create", async (req, res, next) => {
    try {
        const { title, genre, plot, cast } = req.body;

        const createdMovie = await Movie.create({ title, genre, plot, cast });


        res.redirect(`/movies`)
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;