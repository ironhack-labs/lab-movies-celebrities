// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js');
const Movie = require('../models/Movie.model.js');

// all your routes here



////crear movie formulario
router.get('/movies/create', (req, res) => {
    Celebrity
        .find()
        .then(allCelebrities => {
            res.render('movies/new-movie', { allCelebrities })
        })
        .catch(err => console.log(err))
});

router.post('/movies/create', (req, res, next) => {
    const { name, genre, plot, cast } = req.body;
    // 'cast' represents the ID of the user document

    Movie.create({ name, genre, plot, cast })
        .then(allMovies => {
            // when the new movie is created, the user needs to be found and its movies updated with the
            // ID of newly created movies
            return Celebrity.findByIdAndUpdate(cast, { $push: { movies: allMovies._id } });
        })
        .then(() => res.redirect('/movies')) // if everything is fine, redirect to list of posts
        .catch(err => {
            console.log(`Err while creating the post in the DB: ${err}`);
            next(err);
        });
});
////pintar lista de moviessss/////
router.get('/movies', (req, res, next) => {
    Movie.find()
        .populate('cast')
        .then(allMovies => {
            console.log(allMovies);
            res.render('movies/movies', { movies: allMovies });

        })
        .catch(err => console.log(err));
});
////detalles de pelicula
router.get('/movies/:id', (req, res) => {
    const { id } = req.params

    Movie.findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})

/////delete movie////
router.post('/movies/:id/delete', (req, res) => {
    const { id } = req.params
    Movie
        .findByIdAndRemove(id)
        .then(res.redirect('/movies'))
        .catch(err => console.log(err))
})

/// update movies/////

router.get("/movies/:id/edit", (req, res, next) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            return movie
        })
        .then(
            movie => {
                Celebrity
                    .find()
                    .then(celebrities => {
                        return res.render('movies/edit-movie', { movie, celebrities })
                    })
            }
        )
        .catch(err => console.log(err))

})

router.post("/movies/:id/edit", (req, res, next) => {

    const { name, genre, plot, cast } = req.body
    const { id } = req.params      // necesitamos el ID para el método .findByIdAndUpdate()

    Movie
        .findByIdAndUpdate(id, { name, genre, plot, cast })
        .then(() => res.redirect(`/movies/${id}`))
        .catch(err => console.log(err))
})

module.exports = router;