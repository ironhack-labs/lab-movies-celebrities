const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

router.get('/movies/edit-movies', (req, res, next) => res.render('edit-movies'));


router.get('/movies/movie-details', (req, res, next) => res.render('movie-details'));


router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .then(listFromDB => {
            res.render('movies/movies', {listFromDB})
            console.log(listFromDB)
        })
        .catch(err => console.log(`an error happened ${err}`));
});

/* -------- CREATING THE NEW MOVIES ------- */

router.get('/movies/create', (req, res, next) => {
    Celebrity.find() // Promise
    .then(function (celebritiesFromDB) {
        res.render('movies/new-movie', {allCelebrities: celebritiesFromDB})
    })
});

router.post('/movies/create', (req, res, next) => {
    const movieInfo = req.body
    Movie.create(movieInfo)
        .then(() => {
            res.redirect('/movies')
            console.log(movieInfo)
        })
        .catch(err => {
            res.render('movies/new-movie', { errorMessage: 'There was an error creating the movie. Try again!'});
        });
} ),

/* -------- CREATING PAGE FOR MOVIE DETAILS ------- */
router.get('/movies/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        movie = await Movie.findById(id)
        cast = await Celebrity.find({_id: { $in: movie.cast }})
        res.render('movies/movie-details', {movie:movie, cast:cast})
    }
    catch (error) {console.log("an error happened",error)}
})

module.exports = router;