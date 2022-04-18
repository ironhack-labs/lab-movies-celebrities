
const router = require('express').Router()
const { send } = require('express/lib/response')
const { populate } = require('./../models/Celebrity.model')
const Celeb = require("./../models/Celebrity.model")
const Movie = require("./../models/Movie.model")


router.get('/movies/create', (req, res) => {

    Celeb
        .find()
        .then(celebs => {

            res.render('movies/new-movies', { celebs })

        })
        .catch(err => console.log(err))

})

router.post('/movies/create', (req, res) => {


    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(newMovie => {
            res.redirect('/movies')

            //res.send(req.body)

        })
        .catch(err => console.log(err))

})


router.get('/movies', (req, res) => {


    Movie
        .find()
        .select('title')
        .then(movies => {

            res.render('movies/movies', { movies })


        })
        .catch(err => console.log(err))
})

router.get('/movies/movie-details:_id', (req, res) => {

    const { _id } = req.params

    Movie
        .findById(_id)
        .populate('cast')
        .then(movie => {

            res.render('movies/movie-details', movie)

        })

        .catch(err => console.log(err))

})


router.post('/movies/delete:_id', (req, res) => {

    const { _id } = req.params

    Movie
        .findByIdAndDelete(_id)
        .then(() => {

            res.redirect('/movies')
        })

        .catch(err => console.log(err))
})


router.get('/movies/edit:_id', (req, res) => {

    const { _id } = req.params
    const test = {}
    Celeb
        .find()
        .then(celeb => {

            return celeb

        })

        .then((celeb) => {

            Movie
                .findById(_id)
                .populate('cast')
                .then(movie => {

                    [movie].forEach(movieElement => {
                        celeb.forEach(celebElement => {

                            for (let i = 0; i < movieElement.cast.length; i++) {
                                if (movieElement.cast[i].name === celebElement.name) { celebElement.selected = 'selected' }
                            }

                        });


                    });

                    //res.send(movie)

                    res.render('movies/edit-movie', { celeb, movie })

                })
                .catch(err => console.log(err))
        })


})





router.post('/movies/edit-movie:_id', (req, res) => {

    const { _id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(_id, { title, genre, plot, cast })
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
            //res.send(movie)
        })






})






module.exports = router