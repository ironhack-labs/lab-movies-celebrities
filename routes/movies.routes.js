const router = require("express").Router();
const Movie = require ('../models/Movie.model');

router.get('/movies/create', (req, res, next) => {
    res.render("movies/new-movie");
});

router.post('/movies/create',(req, res, next) => {
    const movie = req.body;
 
    Movie
    .create(movie)
    .then(()=> res.redirect("/movies"))
    .catch((error) => next(error));
 });
 

module.exports = router;