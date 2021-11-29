// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// all your routes here

router.get("/create", async (req, res, next) => {
    try {
        const Celebrities = await Celebrity.find();
        res.render("movies/new-movie.hbs", {Celebrities});
    } catch(err){
        console.log(err)
    }
});

router.get("/", async (req, res, next) => {
   res.render("movies/movies.hbs")
});

router.post("/create", async (req, res, next) => {
    const {title, genre, plot, cast} = req.body
    try{
        const newMovie = await Movie.create({title, genre, plot, cast})
        res.redirect("/movies")
    } catch(err){
        console.log(err)
        res.render("movies/new-movie.hbs", {Celebrities});
    }
});

module.exports = router;
