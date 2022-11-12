
const router = require("express").Router();
const Movie = require('./../models/Movie.model');
const Celebrity = require('./../models/Celebrity.model')
// const { route } = require("./celebrities.routes");
// const { route } = require("./celebrities.routes");



//HOMEPAGE
router.get("/", (req, res) => {

    Movie
        .find()
        .populate('cast')
        .then((moviesFromDB) => {
            res.render('movies/movies', { movies: moviesFromDB })
        })
        .catch(err => console.log(err))
})


//CREATE A MOVIE
router.get("/create", (req, res) => {

    Celebrity
        .find()
        .then((celebrities) => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch(err => console.log(err))
})

router.post("/create", (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


//MOVIE DETAILS
router.get("/movie-details/:movie_id", (req, res) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate('cast')
        .then((movie) => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})



//Movie Delete
router.post("/movie-details/:movie_id", (req, res) => {

    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => {
            res.redirect("/")
        })
        .catch(err => console.log(err))
})

//EDIT MOVIE

router.get("/edit-movie/:movie_id", (req, res) => {


    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .then((movie) => {
            Celebrity
                .find()
                .then((celebrities) => {
                    res.render('movies/edit-movie', { movie, celebrities })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

})

router.post("/edit-movie/:movie_id", (req, res) => {

    const { movie_id } = req.params
    const { title, genre, plot } = req.body

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})

module.exports = router;