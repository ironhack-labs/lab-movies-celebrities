const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get('/', (req, res, next) => {
    Movie.find()
        .then(moviesFromDB => {
            res.render('movies/movies', { movies: moviesFromDB });
        })
        .catch(error => {
            console.log('Error while getting the movies from the DB: ', error);
        });
});

router.get('/create', (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDB) => {
        res.render('movies/new-movie', { celebrities: celebritiesFromDB });
    })
    .catch((error) => {
        next(error);
    });
});

router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const newMovie = new Movie({ title, genre, plot, cast });

  newMovie
    .save()
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Error while creating new movie: ", error);
      res.render("movies/new-movie");
    });
});

router.get('/:id', (req, res, next) => {
    Movie.findById(req.params.id)
    .populate('cast')
    .then((theMovieFromDB) => {
        res.render('movies/movie-details', {movie: theMovieFromDB});
    })
    .catch((error) => {
        next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect('/movies');
        })
        .catch((error) => {
            next(error);
        });
});

router.get('/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then((movieFromDB) => {
            Celebrity.find()
                .then((celebritiesFromDB) => {
                    celebritiesFromDB.forEach(celebrity => {
                        celebrity.selected = movieFromDB.cast.some(castMember => castMember._id.equals(celebrity._id));
                    });
                    res.render('movies/edit-movie', {movie: movieFromDB, celebrities: celebritiesFromDB});
                });
        })
        .catch((error) => {
            next(error);
        });
});

router.post('/:id', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast }, {new: true})
        .then(() => {
            res.redirect('/movies');
        })
        .catch((error) => {
            next(error);
        });
});


module.exports = router;
