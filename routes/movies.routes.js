const router = require("express").Router();
const CelebrityModel = require('../models/Celebrity.model');
const MovieModel = require('../models/Movie.model');

// all your routes here
router.get('/movies/create', (req, res, next) => {
    // Iteration #3: Add a new drone
    // ... your code here
    CelebrityModel.find()
        .then((celebrities) => {
            res.render('movies/new_movie', { celebrities });
        })
        .catch((err) => {
            console.error(err);
        });
});

router.post('/movies/create', (req, res, next) => {
    // Iteration #3: Add a new drone
    // ... your code here
    const { title, genre, plot, cast } = req.body
    MovieModel.create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies');
        })
        .catch((err) => {
            res.render('celebrities/new_celebrity');
        });
});

router.get('/movies', (req, res, next) => {
    // Iteration #3: Add a new drone
    // ... your code here
    MovieModel.find()
        .then((movies) => {
            res.render('movies/movies', { movies });
        })
        .catch((err) => {
            console.error(err);
        });

});

router.get('/movies/:id', (req, res, next) => {
    console.log(req.params.id);
    const movieId = req.params.id

    MovieModel.findById(movieId)
        .populate("cast", "name occupation catchPhrase -_id")
        .then((movie) => {
            //console.log('ESTOY AQUIIIIII', { items });
            res.render('movies/movie_details', movie);
            //  console.log('Artist albums', album);
        })
        .catch(err => console.error(err));
});

module.exports = router;