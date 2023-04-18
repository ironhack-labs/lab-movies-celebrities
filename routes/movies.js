
const router = require("express").Router();


router.get("/movies", (req, res, next) => {
    Movie.find()
    .then(moviesFromDb => {
        console.log(moviesFromDb)
    res.render("movies/index", { movies: moviesFromDb})
    })
    .catch(err => next(err))
})

module.exports = router;