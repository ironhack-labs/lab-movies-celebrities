const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get("/movies/create", (req, res) => {

    Celebrity
        .find()
        .then(allCelebritiesFromDB => {
            res.render("movies/new-movie.hbs", {celebrity: allCelebritiesFromDB})
        })
})


router.post("/movies/create", (req, res) => {

    const { title, genre, plot, cast } = req.body;

    Movie
        .create({ title, genre, plot, cast})
        .then(() => res.redirect('/movies'))
        .catch(() => res.render('movies/new-movie.hbs'))
})


router.get("/movies", (req, res) => {

    Movie
        .find()
        .then(allMoviesFromDB => {
            res.render("movies/movies.hbs", {movie: allMoviesFromDB})
        })
        .catch(error => {
            console.log('Error while getting movies from the DB: ', error);
            next(error);
          });
});

router.get("/movies/:movieId", (req, res) => {

    const {movieId} = req.params;

    Movie
        .findById(movieId)
        .populate("cast")
        .then(movie => res.render("movies/movie-details", movie))
        .catch(error => {
            console.log('Error whith DB: ', error);
        })
})

router.post("/movies/:movieId/delete", (req, res) => {

    const {movieId} = req.params;

    Movie
        .findByIdAndRemove(movieId)
        .then(() => res.redirect("/movies"))
        .catch(error => console.log(error))
})

router.get("/movies/:movieId/edit", (req, res) => {

    const {movieId} = req.params;

    const movieToUpdate = Movie
                            .findById(movieId);
                  

    const celebrities =  Celebrity
                            .find();
                         
    Promise.all([movieToUpdate, celebrities])
                .then(([movieToUpdate, celebrities]) =>  res.render("movies/edit-movie", {movieToUpdate, celebrities}))
});

router.post("/movies/:movieId", (req, res) => {

    const {movieId} = req.params;
    const { title, genre, plot, cast} = req.body

    Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast}, {new: true})
        .then(() => res.redirect(`/movies/${movieId}`))
        .catch(err => console.log("update error: ", err))
});
 


module.exports = router;