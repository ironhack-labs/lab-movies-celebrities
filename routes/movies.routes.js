// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const celebrityModel = require('../models/Celebrity.model');
const movieModel = require('../models/Movie.model');

// all your routes here

router.get('/movies/create', (req, res, next) => {
    celebrityModel.find()
        .then((allCelebrities) => {
            res.render('movies/new-movie', { allCelebrities })
        })
        .catch((err) => next(err));
});

router.post("/movies/create", (req, res) => {
    console.log(req.body);
    movieModel.create(req.body)
        .then(() => {
            res.redirect("/movies")
        })
        .catch((err) => next(err));
});

module.exports = router;