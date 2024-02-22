// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movies = require('../models/Movie.model');
const Celebrities = require('../models/Celebrity.model');

// GET route to display form to create movie
router.get('/movies/create', (req, res) => {
    Celebrities.find()
        .then(allCelebs => {
            // console.log("All celebs in DB:", allCelebs)
            res.render('movies/new-movie.hbs', { celebs: allCelebs })
        })
        .catch(error => next(error));
})

// POST route to save new movie. to DB
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movies.create({ title, genre, plot, cast })
        .then(movieFromDB => {
            // console.log(`New movie created: ${movieFromDB}.`);
            res.redirect('/movies');
        })
        .catch(error => res.render('movies/new-movie'));
});

router.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    // console.log('**** The ID from the URL is: ', id);
    Movies.findById(id)
        .populate('cast')
        .then(theMovie => {
            // console.log("Movies from the DB: ", theMovie)
            res.render('movies/movie-details.hbs', { movie: theMovie })
        })
        .catch(error => {
            console.log('Error while retrieving movie details: ', error);

            // Call the error-middleware to display the error page to the user
            next(error);
        });
});

// POST route to delete a movie from the database
router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params;
    // console.log("ID to delete:", id)
    Movies.findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(error => {
            console.log('Error while deleting movie: ', error);

            // Call the error-middleware to display the error page to the user
            next(error);
        });
});

// GET route to display the form to update a specific movie
router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params;
    let movie;
    let celebs;
    // console.log("ID to search:", id)
    Movies.findById(id)
        .then(movieToEdit => {
            movie = movieToEdit;
            return Celebrities.find()
        })
        .then(allCelebs => {
            celebs = allCelebs;
            // console.log("===Movies and Celebs+++:", movie, celebs)
            res.render('movies/edit-movie.hbs', { movie, celebs });
        })
        .catch(error => next(error));
});

// POST route to  make updates on a specific movie
router.post('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params;
    // console.log(req.body)
    const { title, genre, plot, cast } = req.body;

    Movies.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
        .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`)) // go to the details page to see the updates
        .catch(error => next(error));
});

// GET route to retrieve and display all the celebs
router.get('/movies', (req, res) => {
    Movies.find()
        .then(allMovies => {
            // console.log("All movies in DB:", allMovies);
            res.render('movies/movies.hbs', { movies: allMovies })
        })
        .catch(error => next(error));
}
);

module.exports = router;