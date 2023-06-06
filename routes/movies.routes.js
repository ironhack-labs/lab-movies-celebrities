// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// Create new movie
router.get("/movies/create", (req, res, next) => {
    Celebrity.find({})
    .then((celebrities) => {
      res.render('movies/new-movie', { celebrities: celebrities });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/movies/create');
    });
});

router.post("/movies/create", (req, res, next) => {

    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    };


    Movie.create(newMovie)
        .then( (newMovie) => {
            res.redirect("/movies");
        })
        .catch( e => {
            console.log("error creating new movie", e);
            res.redirect("/movies/new-movie");
            next(e);
        });
});

// List all movies

router.get("/movies", (req, res, next) => {
    Movie.find()
        .then( (moviesFromDB) => {

            const data = {
                movies: moviesFromDB
            }

            res.render("movies/movies", data);
        })
        .catch( e => {
            console.log("error getting list of movies from DB", e);
            next(e);
        });
});

// Delete movie
router.post('/movies/:movieId/delete', (req, res, next) => {
    const { movieId } = req.params;

    Movie.findByIdAndRemove(movieId)
        .then(() => res.redirect('/movies'))
        .catch(error => next(error));
});

// Update movie details
router.get('/movies/:movieId/edit', async (req, res, next) => {
    const { movieId } = req.params;

    try {
        const cast = await Celebrity.find({});
        const movie = await Movie.findById(movieId);

        res.render('movies/edit-movie.hbs', { movie: movie, cast: cast });

    } catch (e) {
        next(e);
    }

});

router.post('/movies/:movieId/edit', (req, res, next) => {
    const { movieId } = req.params;
    const { title, genre, plot, cast } = req.body;

    Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
        .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`))
        .catch(error => next(error));
});

// Show movie details

router.get("/movies/:movieId", (req, res, next) => {
    const movieId = req.params.movieId;

    Movie.findById(movieId)
        .populate("cast")
        .then( movieFromDB => {
            res.render("movies/movie-details", { movie: movieFromDB });
        })
        .catch( e => {
            console.log("error getting movie details from DB", e);
            next(e);
        });
});



module.exports = router;