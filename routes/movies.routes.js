const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')


//Iteration #6: Adding New Movies
router.get('/movies/create', (req, res) => {
    Celebrity
        .find()
        .then(celebrity => {
            res.render('movies/new-movie', { celebrity })
        })
        .catch(err => console.log(err))

});


router.post('/movies/create', (req, res, next) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(Movie => {

            res.redirect(`/movies`)
        })
        .catch(err => console.log(err))
});

//Iteration #7: Listing Our Movies
router.get('/movies', (req, res, next) => {

    Movie
        .find()
        .then(movie => {

            res.render('movies/movies', { movie: movie })
        })
        .catch(err => console.log(err))
})


//Iteration #8: The Movie Details Page

router.get('/movies/:id', (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})


//Iteration #9: Remove Movies
router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
});


//Iteration #10: Editing Movies

router.get("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params
    let oneMovie = {}
    Movie
        .findById(id)
        .populate("cast")
        .then((movie) => {
            oneMovie = movie
            return Celebrity.find().select('name')
        })
        .then((allCelebrities) => {
            const movieAndCelebrities = { movie: oneMovie, celebrities: allCelebrities }
            // res.json(movieAndCelebrities)
            res.render("movies/edit-movie", movieAndCelebrities)
        })
        .catch((err) => next(err))
})




router.post('/movies/:id/edit', (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    const { id } = req.params
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))

});





module.exports = router;