// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require('../models/Celebrity.model')
const MovieModel = require('../models/Movie.model')


// all your routes here
router.get('/', (req, res, next) => {
    MovieModel.find()
        .select('title')
        .then((movies) => {
            res.render('movies/movies', { movies })
        })
        .catch((err) => {
            next(err)
        })
})

router.get('/create', (req, res, next) => {
    CelebrityModel.find()
        .select('name')
        .then((celebrities) => {
            res.render('movies/new-movie', { celebrities })
        })
        .catch((err) => next(err))
})

router.get('/:id/edit', (req, res, next) => {
    // get all the celebrities to show them
    // console.log('id/edit')
    CelebrityModel
        .find()
        .select('name')
        .then((celebrities) => {
            MovieModel.findById(req.params.id).populate({ path: 'cast', select: 'name' })
                .then((movie) => {
                    const { _id, title, genre, cast } = movie
                    res.render('movies/edit-movie', { _id, title, genre, celebrities })
                })
                .catch((err) => next(err))
        })
        .catch((err) => next(err))

    // MovieModel.findById(req.params.id)
    //     .populate({ path: 'cast', select: 'name' })
    //     .then((movie) => {
    //         const { _id, title, genre, cast } = movie
    //         console.log("ESTO-------------->", { _id, title, genre, cast })
    //         res.render('movies/edit-movie', { _id, title, genre, cast })
    //     })
    //     .catch((err) => next(err))
})


router.get('/:id', (req, res, next) => {
    console.log('id')
    MovieModel.findById(req.params.id)
        .populate({ path: 'cast', select: 'name' })
        .then((movie) => {
            res.render('movies/movie-details', movie)
        })
        .catch((err) => next(err))
})


router.post('/create', (req, res, next) => {
    const { title, genre, cast } = req.body
    MovieModel.create({ title, genre, cast })
        .then(() => {
            console.log('New film added')
            res.redirect('/movies')
        })
        .catch((err) => {
            console.log('Error: ', err)
            res.redirect('(movies/create')
        })
})

router.post('/:id/edit', (req, res, next) => {
    const { title, genre, cast } = req.body
    console.log("aqui")
    MovieModel.findByIdAndUpdate(req.params.id, { title, genre, cast })
        .then(() => {
            console.log('Movie Updated')
            res.redirect('/movies')
        })
        .catch((err) => {
            console.log("Error")
            next(err)
        })
})

// Could also be done with a get method instead of a post
router.post('/:id/delete', (req, res, next) => {
    MovieModel.findByIdAndRemove(req.params.id)
        .then((deleted) => {
            console.log("Movie removed")
            res.redirect('/movies')
        })
        .catch((err) => next(err))

})

module.exports = router;