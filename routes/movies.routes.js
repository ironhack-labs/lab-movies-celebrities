// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");
const Mov = require("../models/Movies.model")

// all your routes here

//link to create movie page
router.get("/movies/create", (req, res, next)=>{
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render("movies/new-movie.hbs", {allCelebrities})
    })
    .catch(error => next(error));
});



//posting new movies goup to DB
router.post("/movies/create", (req, res, next)=>{
    const {title, genre, plot, cast} = req.body;
    Mov.create({title, genre, plot, cast})
    .then(()=>res.redirect("/movies"))
    .catch(error => next(error));
});


//link to movies viewing page
router.get("/movies", (req, res, next)=>{
    Movie.find()
    .then((allMovies) => {
        //console.log(allMovies);
        res.render("movies/movies.hbs", {movies: allMovies});
    })
    .catch(error => next(error))
})


module.exports = router;