// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require('express')
const router = require("express").Router();

const Movies = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

router.get('/movies/list', (req, res) => {

    Movies
        .find()
        .sort({ title: 1 })
        .populate('cast', 'name')
        .then(movies => res.render('movies/movies', { movies }))
        .catch(err => console.log(err))
})


router.get('/movies/create', (req, res) => {
    Celebrity
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(celebArr => {
            const celebrities = { celebArr }
            res.render('movies/new-movie', celebrities)
        })

})

router.post('/movies/create', (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movies
        .create({ title, genre, plot, cast })
        .then(movies => res.redirect('/movies/list'))
        .catch(err => {
            console.log(err)
            res.render('/movies/create')
        })

})

router.get('/movie-details/:movie_id', (req, res) => {
    const { movie_id } = req.params

    Movies
        .findById(movie_id)
        .populate('cast')
        .then(movieDB => res.render('movies/movie-details', movieDB))
        .catch(err => console.log(err))
})

router.post('/movie/:movie_id/delete', (req, res) => {
    const { movie_id } = req.params

    Movies
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect('/movies/list'))
        .catch(err => console.log(err))


})

router.get('/movie/:movie_id/edit', (req, res) => {
    const { movie_id } = req.params

    Movies
        .findById(movie_id)
        .populate('cast', 'name')
        .then(movie =>
            Celebrity
                .find()
                .then(castArr => {
                    movie.cast.forEach(movieElem => {
                        castArr.forEach(celebElem => {
                            if (movieElem.name.includes(celebElem.name)) {
                                let i = castArr.indexOf(celebElem)
                                castArr.splice(i, 1)
                            }
                        })
                    })
                    res.render('movies/edit-movie', { movie, castArr })
                }))


        .catch(err => console.log(err))
})

router.post('/movie/:movie_id/edit', (req, res) => {
    const { title, genre, plot, cast } = req.body
    const { movie_id } = req.params

    Movies
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast })

        .then(() => res.redirect(`/movie-details/${movie_id}`))
        .catch(err => console.log(err))

})




module.exports = router;