// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then((allCelebritiesFromDB) => {
            res.render("movies/new-movie", {celebritiesAr: allCelebritiesFromDB})
        })

        .catch((error) => {
            console.log("Error getting Celebrities from DB", error);
            next(error)
        })
    
})

router.post("/movies/create", (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    Movie.create({title, genre, plot, cast})
    .then(() =>{
        res.redirect("/movies")
    })

    
    .catch((err) =>{
        console.log("ups, an error has been detected getting the information from the create form of movies", err)
    })


})
module.exports = router;
