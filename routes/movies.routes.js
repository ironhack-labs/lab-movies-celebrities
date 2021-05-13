const express = require("express");
const { db } = require("./../models/Movie.model");
const router = express.Router();
const MovieModel = require("./../models/Movie.model");

// Get - Display movies //

router.get("/all", (req, res, next) => {
    MovieModel.find()
    .then((dbSucces) => {
        res.render("movies/movies.hbs", { movies: dbSucces })
    })
    .catch((err) => next(err))
})


// Get - Display One movie // Only find Movie's info /  Celeb info not including
// Problem 1 : need to put /details before /:id => else localhost/4000/:id !!
// Problem 2 : Route doesn't exit on the app

router.get("/details/:id", (req, res, next) => {
    MovieModel.findById(req.params.id)
    .then((dbSucces) => {
        res.render("movies/movie-details.hbs", { oneMovie: dbSucces });
    })
    .catch((err) => next(err))
});


// Get - Add one movie //

router.get("/new", (req, res) => {
    res.render("movies/new-movie.hbs")
});

// Post - Add one movie //
// Problem 1 : can not display Celebrities name on form  => new-movie.hbs
// Problem 2 : populate celebrities

router.post("/create", (req, res) => {
    MovieModel.create(req.body)
    .then((dbSucces) => {
        res.redirect("/movies/all")
    })
    .catch((err) => {
        res.render("movies/new-movie.hbs")
    })
});

// Detele one movie // 
// Problem : Check delete form => movie-details.hbs


router.post("/:id/delete", (req, res, next) => {
    MovieModel.findByIdAndRemove(req.params.id)
    .then((dbSucces) => {
        res.redirect("/all")
    })
    .catch((err) => next(err))
})


// Get - Edit movie // 
// What is the difference between Update and Get 1 movie (line 21)

router.get("/details/:id/edit", (req, res, next) => {
    MovieModel.findById(req.params.id)
    .then((dbSucces) => {
        redirect("/details/:id")
    })
    .catch((err) => next(err))
})

// Post - Edit movie //

router.post("/details/:id", (req, res, next)=> {
    MovieModel.findByIdAndUpdate(req.params.id)
    .then((dbSucces) => {
        res.render("movies/edit-movie.hbs", {editMovie: dbSucces })
    })
    .catch((err) => next(err))
})

module.exports = router;

// What works on movie route = ADD movie + Display all movie