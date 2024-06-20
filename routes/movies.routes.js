const router = require("express").Router();
const Movie = require("../models/Movie.model");
//GET /movies/create (display form)
router.get("/movies/create", (req, res, next) => {
    res.render("movies/new-movie");
})

//POST /movies/create (process form)
router.post("/movies/create", (req, res, next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.create(newMovie)
        .then((newMovie) => {
            res.redirect("/movies");
        })
        .catch(() => {
            res.redirect("movies/new-movie");
        
        });
});
/* GET /movies - display movies */
router.get("/movies", (req, res, next) => {

    Movie.find()
        .then((moviesFromDB) => {
            const data = {
                movies: moviesFromDB
            }
            res.render("movies/movies", data)
        })
        .catch(e => {
            console.log("error getting movies from the DB", e)
            next(e);
        });
});
//GET /books/:bookId
router.get("./movies/:id", (req, res, next) => {

    const id = req.params.moviesId;

    Movie.findById(id)
        .populate('cast')
        .then(movieFromDB => {
            res.render("movies/movie-details", movieFromDB)
        })
        .catch(e => {
            console.log("error getting movie details from the DB", e)
            next(e);
        });

});



module.exports = router;