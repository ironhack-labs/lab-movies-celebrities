const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model")
const MovieModel = require("../models/Movie.model")

router.get('/movies/create', (req, res, next) => {
    CelebrityModel
        .find()
        .then((celebrities) => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch((err) => next(err))
});

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    MovieModel
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies');
        })
        .catch((err) => res.render('celebrities/new-movie'));
});

router.get('/movies', (req, res, next) => {
    MovieModel
        .find()
        .then((movies) => {
            res.render('movies/movies', { movies });
        })
        .catch((err) => next(err));
});

router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params;
    MovieModel
        .findById(id)
        .populate("cast")
        .then((movie) => {
            res.render('movies/movie-details', movie);
        })
        .catch((err) => next(err));
});

router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params;
    MovieModel
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => next(err));
});

router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params;
    MovieModel
        .findById(id)
        .populate("cast")
        .then((movie) => {
            CelebrityModel
                .find()
                .then((celebrities) => {
                    movie.cast.map((celebrityCast) => {
                        celebrities.map((celebrityMap, i, celebritiesMap) => {
                            if (celebrityMap.id === celebrityCast.id) {
                                celebritiesMap[i].__v = 1
                            }
                        })
                    })
                    res.render('movies/edit-movie', { movie, celebrities });
                })
                .catch((err) => next(err));
        })
        .catch((err) => next(err));
});

router.post('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;

    MovieModel
        .findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
        .then(() => {
            res.redirect(`/movies/${id}`);
        })
        .catch((err) => next(err));
});

module.exports = router;