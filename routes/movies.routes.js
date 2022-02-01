// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


const CelebrityModel = require("../models/Celebrity.model");
//require the movie model
const Movie = require('../models/Movie.model');

// all your routes here
//GET route to display form to create a celebrity
router.get('/movies/create', (req, res, next) => {
    CelebrityModel.find()
    .then((celebs) => {
        res.render('movies/new-movie.hbs', { celebs });
    });
});

//POST get all info abou new celeb user submitted from the form. use this to create a new celeb in the database
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
      .then(() => res.redirect("/movies"))
      .catch((error) => res.render("movies/new-movie.hbs"));
});

module.exports = router;
