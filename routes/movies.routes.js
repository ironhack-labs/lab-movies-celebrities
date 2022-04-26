const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

//READ movies
router.get("/movies", (req, res, next) => {
    Movie.find()
        .then((moviesArr) => {
            res.render("movies/movies", {
                movies: moviesArr
            })
        })
        .catch((err) => {
            console.log("Oops, there was an error!", err)
        })

})

//CREATING new movies

router.get("/movies/create", (req, res, next) => {
    res.render("movies/new-movie")
})

router.post("/movies/create", (req, res, next) => {

    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }

    Movie.create(newMovie)
        .then((movieFromDB) => {
            res.redirect("/movies")
        })
        .catch((err) => {
            console.log("Oops, there was an error!", err)
            res.render("movies/new-movie")
        })
})

//SHOW movie details

router.get("/movies/:id", (req, res, next) => {
    const id = req.params.ObjectId

    Movie.findById(id)
    .then((movieDetails) => {
        res.render("movies/movie-details", movieDetails)
        console.log(movieDetails);

    })
    .catch((err) => {
        console.log("Oops, there was an error!", err)
    })

})

//DELETE movies
router.post("/movies/:movieId/delete", (req, res, next) => {
    const id = req.params.movieId

    Movie.findByIdAndRemove(id)
    .then(result => res.redirect("/movies"))
    .catch((err) => {
        console.log("Oops, there was an error!", err)
    })
})

//UPDATE
router.get("/movies/:id/edit", (req, res, next) => {
    const id = req.params.ObjectId;
    Movie.findById(id)
        .then((movieDetails) => {
            res.render("movies/edit-movie", movieDetails);
        })
        .catch(err => {
            console.log("error getting movie details from DB", err)
        });
});

router.post("/movies/:id/edit", (req, res, next) => {

    const id = req.params.ObjectId;

    const newDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    };

    Movie.findByIdAndUpdate(id, newDetails)
        .then((movieFromDB) => {
            res.redirect(`/movies/${movieFromDB._id}`);
        })
        .catch(err => {
            console.log("error updating movie in DB", err)
        });
});


module.exports = router;