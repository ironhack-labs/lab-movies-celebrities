const router = require("express").Router();

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model');
const { send } = require("express/lib/response");


// all your routes here

router.get('/movies/create', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrities => {
            res.render("./movies/new-movie", { celebrities })
        })
        .catch(err => console.log(err))
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))

})

router.get("/movies", (req, res, next) => {

    Movie
        .find()
        .then(movies => {
            res.render("./movies/movies", { movies })
        })
        .catch(err => console.log(err))


})



router.get("/movies/:id", (req, res, next) => {


    Movie
        .findById(req.params.id)
        .populate('cast')
        .then(movieID => {
            res.render("./movies/movie-details", { movieID })
        })
        .catch(err => console.log(err))

})

router.post("/movies/:id/delete", (req, res, next) => {

    Movie
        .findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
})


router.get("/movies/:id/edit", (req, res, next) => {


    Movie
        .findById(req.params.id)
        .then(movieID => {
            Celebrity
                .find()
                .then(allCelebrites => res.render('movies/edit-movie', { movieID, allCelebrites }))
                .catch(err => console.log(err))
        })
})


router.post("movies/:id/edit", (req, res, next) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
        .then(updatedMovie => {
            res.redirect(`./movies/${updatedMovie.id}`)
        })
        .catch(err => console.log(err))
})







module.exports = router;