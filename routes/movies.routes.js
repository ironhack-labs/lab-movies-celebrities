// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")
// all your routes here

router.get("/movies/create", (req, res, next) => {
    Celebrity
        .find()
        .then((celebrities) => {
            res.render("movies/new-movie", { celebrities })
        })
        .catch((err) => {
            console.log(err)
        })
});

router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie
        .create({ title, genre, plot, cast })
        .then((newMovie) => {
            console.log(newMovie)
            res.redirect("/movies")
        })
        .catch(err => console.log(err))
});

router.get("/movies", (req, res, next) => {
    let counter = 1;
    Movie
        .find()
        .populate("cast")
        .then(movies => {
            movies.forEach(movie => {
                movie.counter = counter++;
            });
            console.log('holaaaa', movies)
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
});

router.post("/movies/:id/delete", (req, res, next) => {
    const { id } = req.params
    Movie
        .findByIdAndDelete(id)
        .then(() => { res.redirect("/movies") })
        .catch((err) => { console.log(err) })
});

router.get("/movies/:id", (req, res, next) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate("cast")
        .then((movie) => {
            console.log(movie)
            res.render("movies/movie-details", movie)
        })
        .catch((err) => { console.log(err) })
});

router.get("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params
    Celebrity
        .find()
        .then((celebrities) => {
            Movie
                .findById(id)
                .then((movie) => {
                    movie.celebrities = celebrities;
                    res.render("movies/edit-movie", movie);
                })
                .catch(err => console.log(err))
        })
        .catch((err) => {
            console.log(err)
        });
});

router.post("/movies/:id/edit", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    const { id } = req.params
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect("/movies")
        })
        .catch(err => console.log(err))
})

module.exports = router;