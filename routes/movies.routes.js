const router = require("express").Router();
const {
    find,
    findById
} = require("./../models/Celebrity.model");
const CelebrityModel = require('./../models/Celebrity.model')
const MovieModel = require('./../models/Movie.model')

router.get('/create', (req, res) => {
    CelebrityModel
        .find()
        .select('name')
        .then((celebrities) => {
            res.render('movies/new-movie', {
                celebrities
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.post('/create', (req, res) => {

    const {
        title,
        genre,
        plot,
        cast
    } = req.body
    const movie = {
        title,
        genre,
        plot,
        cast
    }

    if (!title.length || !genre.length || !plot.length || !cast.length) {
        CelebrityModel
            .find()
            .select('name')
            .then((celebrities) => {
                res.render('movies/new-movie', {
                    celebrities,
                    movie,
                    error: 'Fill all the fields'
                })
            })
            .catch(err => console.log(err))
        return
    }

    MovieModel
        .create({
            title,
            genre,
            plot,
            cast
        })
        .then((movie) => {
            res.redirect('/movies')
        })

        .catch(err => console.log(err))

})

router.get('/', (req, res) => {
    MovieModel
        .find()
        .select('title')
        .populate('cast')
        .then((movies) => res.render('movies/movies', {
            movies
        }))
        .catch(err => console.log(err))
})

router.get('/movie-details/:title/:id', (req, res) => {
    const {
        title,
        id
    } = req.params
    MovieModel
        .findById(id)
        .populate('cast')
        .then(theMovie => res.render('movies/movie-details', theMovie))
})


router.post('/:id/delete', (req, res) => {

    const {
        id
    } = req.params

    MovieModel
        .findByIdAndDelete(id)
        .then(res.redirect('/movies'))
        .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    const {
        id
    } = req.params
    const celebrities = CelebrityModel.find()
    const movie = MovieModel.findById(id).populate("cast")

    Promise.all([celebrities, movie])
        .then(all => {
            res.render('movies/edit-movie', {
                all
            })
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    const {
        id
    } = req.params
    const {
        title,
        genre,
        plot,
        cast
    } = req.body

    if (!title || !genre || !plot || !cast) {
        res.render('movies/edit-movie', {
            error: 'All fields must be completed'
        })
        return
    }

    MovieModel
        .findByIdAndUpdate(id, {
            title,
            genre,
            plot,
            cast
        }, {
            new: true
        })
        .then(movie => res.redirect(`/movies/movie-details/${movie.title}/${movie.id}`))
        .catch(err => console.log(err))

})

module.exports = router;