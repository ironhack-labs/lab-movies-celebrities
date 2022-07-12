// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');



router.get('/movies/create', (req, res) => {

    Celebrity.find()
        .then(result => {
            res.render("movies/new-movie", { result })
        })
        .catch((error) => {
            console.log("Error connecting to DB", error)
        });
});

router.post("/movies/create", (req, res) => {

    Movie.create(rec.body)
        .then(() => {
            res.redirect("/movies");
        })
        .catch((error) => {
            console.log("Error creatin movie", error)
            res, render("movies/new-movie")
        });
});

router.get("/movies", (req, res) => {
   
    Movie.find()
    .then(result => {
        res.render("movies/movies", {result})
    })
    .catch((error) => {
        console.log("Error connecting to DB", error)
    });
});




module.exports = router;