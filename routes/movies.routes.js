const router = require("express").Router();
const Movie = require('../models/Movie.model');

router.get("/create", (req, res, next) =>
 {
    res.render("/movies/new-movie");
 })

 router.post("/create", (req, res, next) => {
    const data = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
        Movie.insert(data)
        .then((dataFromDB) => {
            res.render("/movies", {dataFromDB})
        })
        .catch((e) => {
            console.log(e)
        })
 })
module.exports = router;