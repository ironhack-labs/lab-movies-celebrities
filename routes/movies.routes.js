// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
// Iteration #6: Adding New Movies
const Movie = require('../models/Movie.model');
const Celebrity = require("../models/Celebrity.model")

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render('movies/new-movie.hbs', {celebrities})
    })
    .catch((error) => {
        console.log(error)
    })
    
});

router.post('/movies/create', (req, res, next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.create(newMovie)
    .then(() => {
        res.redirect('/movies')
    })
    .catch((error) => {
        console.log(error);
    })
});

// Iteration #7: Listing Our Movies
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((movies) => {
        res.render('movies/movies.hbs', {movies});
   })
    .catch((error) => {
        console.log(error);
    })
});

// Iteration #8: The Movie Details Page
router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id

    Movie.findById(id)
    .populate("cast")
    .then((movieDetails) => {
        res.render('movies/movie-details', {movieDetails});
   })
    .catch((error) => {
        console.log(error);
    })
});

// Iteration #9: Deleting Movies
router.post("/movies/:id/delete", (req, res, next) => {
    const id = req.params.id

    Movie.findByIdAndRemove(id)
    .then(() => {
        res.redirect("/movies")
    })
    .catch(error => {
        res.redirect("/movies")
        console.log(error)
    })
})

// Iteration #10: Editing Movies
router.get("/movies/:id/edit", (req, res, next) => {
    const id = req.params.id
    
    let celebritiesArr;

    Celebrity.find()
        .then( (celebritiesFromDB) => {
            celebritiesArr = celebritiesFromDB;
            return Movie.findById(id)
        })
        .then((movieDetails) => {

            const data = {
                movieDetails,
                celebritiesArr
            };
            console.log(data)
            res.render("movies/edit-movie", data);
        })
        .catch(err => {
            console.log(err);
            next();
        });
})

router.post("/movies/:id/edit", (req, res, next) => {
    const id = req.params.id;

    const newDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }

    Movie.findByIdAndUpdate(id, newDetails)
        .then(() => {
            res.redirect(`/movies/${id}`);
        })
        .catch(err => {
            res.redirect(`/movies`);
            console.log(err);
            next();
        });
    
})

module.exports = router;