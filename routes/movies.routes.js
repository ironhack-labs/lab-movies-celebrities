// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movies.model")
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

//link to create movie page
router.get("/movies/create", (req, res, next)=>{
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render("movies/new-movie", {allCelebrities})
    })
    .catch(error => next(error));
});



//posting new movies goup to DB
router.post("/movies/create", (req, res, next)=>{
    const {title, genre, plot, cast} = req.body;

    Movie.create({
        title, 
        genre, 
        plot, 
        cast
    })
    .then(createdMovie => res.redirect("/movies"))
    .catch(error => next(error));
});




module.exports = router;