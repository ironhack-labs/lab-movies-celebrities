// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here
// create a new movie - generate the form
router.get("/movies/create", (req, res, next)=>{
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render("movies/new-movie.hbs", {allCelebrities})
    })
    .catch(error => next(error));
    
});
// create a new movie - send the form to the server
router.post("/movies/create", (req, res, next)=>{
    const {title, genre, plot, cast} = req.body;

    Movie.create({title, genre, plot, cast})
    .then(()=>res.redirect("/movies"))
    .catch(error => next(error));
});

// delete a movie
router.post("/movies/:movieId/delete", (req, res, next)=>{
    const { movieId } = req.params;

    Movie.findByIdAndDelete( movieId )
    .then(() => res.redirect("/movies"))
    .catch(error => next(error));
});

// edit a movie - get the form
router.get("/movies/:movieId/edit", (req, res, next)=>{
    const { movieId } = req.params;

    Movie.findById(movieId)
    .populate('cast')
    .then((movieToEdit) => {
        Celebrity.find()
        .then(celebrities => {
            res.render("movies/edit-movie.hbs", {movie: movieToEdit, celebrities});
        })
    })
    .catch(error => next(error));
});

// edit a movie - update the movie document
router.post("/movies/:movieId/edit", (req, res, next)=>{
    const { title, genre, plot, cast } = req.body;
    const { movieId } = req.params;

    Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
    .then((updatedMovie)=>{
        res.redirect(`/movies/${updatedMovie._id}`)
    })
    .catch(error => next(error));
})

// show details of a movie
router.get("/movies/:movieId", (req, res, next)=>{
    const { movieId } = req.params;

    Movie.findById(movieId)
    .populate("cast")
    .then( movie => {
        res.render("movies/movie-details.hbs", {movie})
    })
    .catch(error => next(error));
});

// retrieve all movie titles
router.get("/movies", (req, res, next)=>{
    Movie.find()
    .then((allMovies) => {
        //console.log(allMovies);
        res.render("movies/movies.hbs", {movies: allMovies});
    })
    .catch(error => next(error))
})

module.exports = router;