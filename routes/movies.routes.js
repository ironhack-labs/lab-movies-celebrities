const router = require('express').Router();
const movieModel = require('../models/Movie.model');
const celebModel = require('../models/Celebrity.model');

//Movies list
router.get('/movies', (req, res, next) => {
    movieModel
        .find()
        .populate('cast', 'name')
        .then((movies) => {
            if (movies.length === 0) {
                // movies is the same as movies/index, whoa
                res.render('movies', { movies: false });
            } else {
                // res.json(movies);
                res.render('movies', { movies });
            }
        })
        .catch((err) => {
            next(err);
        });
});

// Create a new movie
router.get('/movies/new-movie', (req, res, next) => {
    celebModel
        .find()
        .then((celebs) => {
            res.render('movies/new-movie', { celebs });
        }).catch((err) => {
            next(err);
        });
});

router.post('/movies/new-movie', (req, res, next) => {
    console.log(req.body);
    const { title, genre, plot, choice } = req.body;

    const newMovie = new movieModel({ title, genre, plot, cast: choice });

    newMovie
        .save()
        .then(() => {
            console.log()
            res.redirect('/movies');
        })
        .catch((err) => {
            next(err);
        });
});

// Movie details
router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params;
    movieModel
        .findById(id)
        .populate('cast', 'name')
        .then((movie) => {
            res.render('movies/movie-details', { movie });
        })
        .catch((err) => {
            next(err);
        });
});

// Delete a movie
router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params;
    movieModel
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/movies');
        })
        .catch((err) => {
            next(err);
        });
});


// Edit a movie
router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params;
    movieModel
        .findById(id)
        .populate('cast', 'name')
        .then((movie) => {
            celebModel
                .find()
                .then((celebs) => {
                    const combined = [];
                    const idArr = [];

                    // This works and does what I want, but I dont know if its the best way
                    for (const celeb of celebs) {
                        for (const cast of movie.cast) {
                            if (celeb._id.equals(cast._id)) {
                                combined.push({ celeb, checked: true });
                                idArr.push(celeb._id);
                            }
                        }
                        if (!idArr.includes(celeb._id)) {
                            combined.push({ celeb });
                            idArr.push(celeb._id);
                        }
                    }
                    console.log(combined);
                    res.render('movies/edit-movie', { movie, celebs: combined });
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot } = req.body;
    let { choice } = req.body;

    if (!choice) {
        choice = [];
    }

    movieModel
        .findByIdAndUpdate(id, { title, genre, plot, cast: choice })
        .then(() => {
            res.redirect('/movies');
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;