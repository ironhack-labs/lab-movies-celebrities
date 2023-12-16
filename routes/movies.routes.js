// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const celebritiesModel = require("../models/celebrity.model");
const moviesModel = require("../models/movie.model");



// all your routes here

router.get('/', (req, res) => {
    res.render('movies/movies.hbs')
});

router.get('/create', (req, res) => {
    celebritiesModel.find()
    .then((dataFromDataBase) => {
        res.render('movies/new-movie.hbs', { "celebrities": dataFromDataBase });
    })
    .catch((err) => {
        console.error(err);
    })
});

router.post('/create', (req, res, next) => {
   const { title, genre, plot, cast } = req.body
    moviesModel.create({ title, genre, plot, cast })
    .then((doc) => {
        res.redirect(301, '/movies');
    })
    .catch((err) => {
        console.error(err);
        res.render('movie/new-movie.hbs')
    })
});

module.exports = router;