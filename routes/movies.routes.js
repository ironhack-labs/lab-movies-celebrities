// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
// const Model = require("../models/Movie.model");

// all your routes here

// Add new movies - Show a form to create a movie
// router.get("/movies/create", (req, res, next) => {


//     //Movie.create()
//     .then((movieArr) => {
//         res.render("movies/new-movie", {movies: movieArr});
//     })
//     .catch(err => {
//         console.log("error adding movies", err);
//         next(err);
//     });
// })

router.get("/movies/create", (req, res, next) => {
    res.render("movies/new-movie");
  });


  router.post("/movies/create", (req, res, next) => {

    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.create(newMovie)
        .then(() => {
            res.redirect("/movies/create")
        })
        .catch(err => {
            console.log("error creating movies on DB", err)
            next(err);
        })

});


// Add new movies - send data from form to this route + create movie + send to DB

module.exports = router;