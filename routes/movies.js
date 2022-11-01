const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/movies/new-movie", async (req, res, next) => {
    try {
        const movies = await movies.find();
        res.render("movies/new-movie.hbs", { movies })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get("/movies/create", (req, res, next) =>
    res.render("movies/new-movie"))



router.post("/movies/create", async (req, res, next) => {
    try {
        const { body } = req.body


        await Movie.create({ body })

        res.redirect("/movies/create")
    } catch (error) {
        console.log(error)
        next(error)
    }
})


router.get("/movies", async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render("movies/movies.hbs", { movies })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = router;