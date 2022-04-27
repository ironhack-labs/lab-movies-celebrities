// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

// CREATE MOVIES: render form
router.get("/movies/create", (req, res, next) => {
   Celebrity.find()
    .then((celebritiesArr) => {
        console.log(celebritiesArr)
        res.render("movies/new-movie", {celebrities: celebritiesArr});
    })
    .catch(err => {
        console.log("error getting celebrities from DB", err)
        next(err);
    });  
          
})

// CREATE MOVIES: process form
router.post("/movies/create", (req, res, next) => {

    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        celebrity: req.body.celebrity
    }

    Movie.create(newMovie)
    //console.log(newMovie);
        .then((movieFromDB) => {
            res.redirect("/movies");
        })
        .catch(err => {
            console.log("error creating movie on DB", err)
            next(err);
        });
})

/* MOVIES List page */
router.get("/movies", (req, res, next) => {
    Movie.find()
        .populate("celebrity")
        .then((movieFromDB) => {
            console.log(movieFromDB);
            res.render("movies/movies", { movies: movieFromDB})
        })
        .catch(err => console.log("error getting movies list" + err))
})


// READ: display movie details
router.get("/movies/:id", (req, res, next) => {
    const id = req.params.id;

    Movie.findById(id)
        .populate("celebrity")
        .then((movieDetails) => {
            res.render("movies/movie-details", movieDetails);
        })
        .catch(err => {
            console.log("error getting movie details from DB", err)
            next(err);
        });
})

// DELETE.
router.post("/movies/:id/delete", (req, res, next) => {
    const id = req.params.id;
    Movie.findByIdAndRemove(id)
        .then(response => {
            res.redirect("/movies");
        })
        .catch(err => {
            console.log("error deleting movie from DB", err);
            next(err);
        });

});

// UPDATE: display form to edit
router.get("movies/:id/edit", (req, res, next) => {
    const id = req.params.id;
    Movie.findById(id)
        .then((movieDetails) => {
            console.log(movieDetails);
            res.render("movies/edit-movie", movieDetails)
        })
        .catch(err => {
            console.log("error getting movie details from DB", err)
            next(err);
        });
});

// UPDATE: process form to edit
router.post("/movies/:id/edit", (req, res, next) => {

    const id = req.params.id;

    const newDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        celebrity: req.body.celebrity,
    };

    Movie.findByIdAndUpdate(id, newDetails)
        .then((moviesFromDB) => {
            res.redirect("movies");
        })
        .catch(err => {
            console.log("error updating movie in DB", err)
            next(err);
        });
});

module.exports = router;