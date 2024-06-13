// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model ");

// all your routes here

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFound => res.render("movies/new-movie", {celebritiesFound}))
  });

router.post("/movies/create", (req, res, next) => {
    const createdMovie = req.body;
        console.log("About to create:", createdMovie)
              Movie.create(createdMovie)
              .then(() => res.redirect('/movies'));
})

router.get("/movies", (req, res, next) => {
    Movie.find()
    .then (moviesFound => {
    console.log(moviesFound)
    res.render("movies/movies", {moviesFound})
})
    .catch(err => console.log(err))
});

router.get("/movies/:id", (req, res, next) => {
    const id = req.params.id
    console.log(id)
    Movie.findById(id)
    .populate("cast")
    .then (movieFound => {
    console.log(movieFound)
    res.render("movies/movie-details", {movieFound})
})
   .catch(err => console.log(err))
});

router.post('/movies/:id/delete', (req, res) => {
    const id = req.params.id
    Movie.findByIdAndRemove(id)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})

router.get("/movies/:movieId/edit", (req, res, next) => {
    let movieId = req.params.movieId;
    let editData = {} // <-- I will be filling this variable with diverse data across the sequence of promises:
    Movie.findById(movieId)
    .then((movieDetails) => {
        editData.movie = movieDetails
        return Celebrity.find() // Important to have a return! Without it  the data won't pass to the next ".then".
    })
    .then((celebrities) => {
        //console.log("celebrities: ",celebrities)
        editData.celebrities = celebrities
        //console.log(editData)
        res.render("movies/edit-movie", editData)
    })
    .catch(err => next(err)) 
})


module.exports = router;