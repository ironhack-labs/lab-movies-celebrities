// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/movies/create", (req, res, next) => {
    
    Celebrity.find()
    .then((celebritiesArr) => {
        
        res.render("movies/new-movie", { celebrities: celebritiesArr });
    }).catch((err) => {
        
    });

});


router.get("/movies/:movieId", (req, res, next) => {
    const {movieId} = req.params;

    Movie.findById(movieId)
        .populate("cast")
        .then((movie) => {
            console.log(movie);
            res.render("movies/movie-details", {movie});
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/movies/:movieId/edit", (req, res, next) => {
    const {movieId} = req.params;
    let movieDetails;

    Movie.findById(movieId)
        .then((movie) => {
            movieDetails = movie;

            return Celebrity.find();
        })
        .then(celebritiesArr => {
            res.render("movies/edit-movie", {movie: movieDetails, celebrities: celebritiesArr});
        }) 
        .catch((err) => {
            next(err)
        });
});


router.get("/movies", (req, res, next) => {

    Movie.find()
        .then((moviesArr) => {

            res.render("movies/movies", {movies: moviesArr});

        }).catch((err) => {
            next(err);
        });
});

//POST

router.post("/movies/create", (req, res, next) => {
    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    };

    Movie.create(movieDetails)
        .then(() => {
            res.redirect("/movies");
        }).catch((err) => {
            next(err);
        });

});

router.post("/movies/:movieId/edit", (req, res, next) => {
    const {movieId} = req.params;
    const newMovieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    };
    
    Movie.findByIdAndUpdate(movieId, newMovieDetails, { new: true })
    .then(()=> {
        res.redirect(`/movies`);
    })
    .catch(err => next(err));
})

//DELETE
router.post("/movies/:movieId/delete", (req, res, next) => {
    const {movieId} = req.params;

    Movie.findByIdAndDelete(movieId)
        .then(() => {
            res.redirect("/movies");            
        }).catch((err) => {
            next(err);
        });
        
});

module.exports = router;