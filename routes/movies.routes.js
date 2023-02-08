const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/movies/create", (req, res, next) => {
    Celebrity
    .find()
    .then(celebrityDB => 
    res.render('movies/new-movie', {celebrityDB})
    )
})

module.exports = router;