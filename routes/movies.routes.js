const express = require('express');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');
const router = express.Router();



function isLoggedIn(req, res, next) {
    if (req.session.currentUser) next() // next invocation tells Express that the middleware has done all it work
    else res.redirect("/auth/login")
}



router.get(
    "/create", isLoggedIn,
    (req, res) => {
        Celebrity.find()
            .then((allCelebs) => {
                res.render("movies/new-movie", {
                    allCelebs
                })
            }).catch((err) => {
                console.log(err)
            });

    })

router.get(
    "/:id",
    (req, res) => {
        Movie.findById(req.params.id)
            .populate("cast")
            .then((movie) => {
                res.render("movies/movie-details", movie)
            }).catch((err) => {
                console.log(err)
            });
    })

router.get("/:id/delete", isLoggedIn, (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(deletedMovie => res.redirect("/movies"))
        .catch(error => console.log(error))
})



router.route("/:id/edit")
    .get((req, res) => {
        Movie.findById(req.params.id)
            .then(movie => res.render("movies/edit-movie", movie))

    })
    .post((req, res) => {
        const {
            title,
            genre,
            plot,
            cast
        } = req.body
        Movie.findByIdAndUpdate(
                req.params.id, {
                    title,
                    genre,
                    plot,
                    cast
                }
            )
            .then(updateMovie => res.redirect(`/movies/${req.params.id}`))
            .catch(error => console.log(error))
    })




router.post(
    "/create",
    (req, res) => {
        const {
            title,
            genre,
            plot,
            cast
        } = req.body
        Movie.create({
                title,
                genre,
                plot,
                cast
            })
            .then(newMovie => res.redirect("/movies"))
            .catch(err => res.render("/movies/new-movie"))
    })

router.get(
    '/',
    (req, res) => { // What URL does this answer?
        Movie.find()
            .then(movies => {
                res.render('movies/movies', {
                    movies
                })
            })
        // You have to continue coding the route
    });

module.exports = router;