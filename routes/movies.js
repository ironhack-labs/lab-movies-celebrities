// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// require movie model
const Movie = require('./../models/Movie.model');

// require celebrity model
const Celebrity = require("./../models/Celebrity.model");

//Movies list

router.get('/movies', (req, res) => {

    Movie
        .find()
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
});

//Movies creation

router.get('/movies/create', (req, res) => {

    Celebrity
        .find()
        .then((celebrities) => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch((err) => console.log(err))

})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => {
            console.log(err)
        })
})

//Movie details

router.get('/movies/:movie_id', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})

//Movies deletion

router.post("/movies/:movie_id/delete", (req, res) => {
    const { movie_id } = req.params;

    Movie
        .findByIdAndRemove(movie_id)
        .then(() => res.redirect("/movies"))
        .catch((err) => console.log(err));
});


//Movies edit


router.get('/movies/:movie_id/edit', (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .then(movie => {

            Celebrity
                .find()
                .then(celebrity => {

                    res.render('movies/edit-movie', { movie, celebrity })

                })

        })

})

router.post('/movies/:movie_id/edit', (req, res) => {

    const { title, genre, plot, cast } = req.body

    const { movie_id } = req.params

    Movie

        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })

        .then(() => res.redirect('/movies'))

        .catch(err => (err))

})



module.exports = router;