const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model.js")
// all your routes here

router.get("/movies/create", (req, res) => {
    Celebrity.find()
    .populate("name")
    .then( (celebsFromDb) => {
        const celebs = {
            celebs: celebsFromDb
        }
        res.render("movies/new-movie", celebs)
    })
})

// router.post("/movies/create", (req, res) => {
//     const newMovie = {
//         title: req.body.title,
//         genre: req.body.genre,
//         plot: req.body.plot,

//     }
// })




module.exports = router;