const router = require("express").Router();
const Movie = require("../models/Movie.model");

router.get("/create", (req, res, next) => {
    res.render("movies/new-movie")
});

router.post("create", (req, res, next) => {
    
})

module.exports = router;