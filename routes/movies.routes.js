// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies", (req, res, next) => {
    Movie.find()
        .populate("cast")
        .then(moviesFromDB => {
            res.render("movies/movies", { movies: moviesFromDB });
        })
        .catch(err => {
            console.log('Error getting movies from DB...', err)
        });
});

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render("movies/new-movie", { celebArr: celebrities });
        })
        .catch(err => {
            console.log('Error getting celebrities from DB...', err);
        })
});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
        .then(res.redirect("/movies"))
        .catch(err => {
            console.log('Error creating new movie...', err);
        })
})

router.get("/movies/:id", (req, res, next) => {
    Movie.findById(req.params.id)
        .populate("cast")
        .then(movie => {
            res.render("movies/movie-details", movie);
        })
        .catch();
});

router.post("/movies/:id/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/movies");
        })
        .catch(err => {
            console.log("Error deleting movie...", err);
        });

});

router.get('/movies/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
        .then(movieToEdit => {
            res.render("movies/edit-movie", { movie: movieToEdit });
        })
        .catch(error => next(error));
});

router.post('/movies/:id/edit', (req, res, next) => {
    const movieId = req.params.id;

    const newDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }
    Movie.findByIdAndUpdate(movieId, newDetails)
        .then(() => {
            res.redirect(`/movies/${movieId}`);
        })
        .catch(err => {
            console.log("Error updating movie...", err);
        });
});

module.exports = router;