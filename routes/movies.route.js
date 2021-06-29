const router = require("express").Router();
const MovieModel = require('../models/Movie.model');
const CelebrityModel = require('../models/Celebrity.model');


/* GET MOVIES page */

router.get("/movies", (req, res, next) => {
    MovieModel.find()
        .then((movies) => {
            res.render('movies/movies', {movies}) 
        }).catch((err) => {
            next(err);
        });
});

router.get('/movies/create', (req, res, next) => {
    CelebrityModel.find()
        .then((celebrities) => {
            res.render('movies/new-movie', {celebrities});
        }).catch((err) => {
            next(err);
        }) 
});

router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    
    MovieModel.create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        }).catch((err) => {
            console.log(err);
            res.render('movies/new-movie');
        })
});

router.get('/movies/:id', (req, res, next) => {
    let id = req.params.id;

    MovieModel.findById(id)
        .populate('cast')
        .then((movie) => {
            res.render('movies/movie-details', { movie });
        }).catch((err) => {
            next(err);
        });
});

router.post('/movies/:id/delete', (req, res, next) => {
    let id = req.params.id;

    MovieModel.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/movies');
        }).catch((err) => {
            next(err);
        })
});

router.get('/movies/:id/edit', (req, res, next) => {
    let id = req.params.id;

    MovieModel.findById(id)
        .then((movie) => {
            CelebrityModel.find()
                .then((celebrities) => {
                    res.render('movies/edit-movie', {movie, celebrities})
                })
        }).catch((err) => {
            next(err);
        });
});

router.post('/movies/:id/edit', (req, res, next) => {
    let id = req.params.id;
    const { title, genre, plot, cast } = req.body;

    MovieModel.findByIdAndUpdate(id, { title, genre, plot, cast })
        .then((movie) => {
            res.redirect(`/movies/${movie._id}`);
        }).catch((err) => {
            next(err);
        });
});

module.exports = router;


