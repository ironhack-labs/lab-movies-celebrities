const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');


router.get("/movies/create", (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render("movies/new-movie", { celebrities })
        })
        .catch(err => console.log(err))
})

router.post("/movies/create", (req, res) => {

    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect("/movies"))
        .catch(err => console.log(err))

})

router.get("/movies", (req, res) => {
    Movie
        .find()
        .then(movies => res.render("movies/movies", { movies }))
        .catch(err => console.log(err))
})

router.get("/movie-details/:id", (req, res) => {
    Movie
        .findById(req.params.id)
        .populate("cast")
        .then((oneMovie) => {
            res.render("movies/movie-details", oneMovie);
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post('/movies/:id/delete', (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
})



router.get("/movies/:id/edit", (req, res) => {
    const { id } = req.params;

    Movie
        .findById(id)
        .then((movie) => {
            Celebrity
                .find()
                .then((celebrities) => {
                    res.render("movies/edit-movie", { movie, celebrities });
                });
        })
        .catch((error) => {
            console.log(error);
            res.redirect("/movies");
        });
});

router.post("/movies/:id/edit", (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body;

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then((updateMovie) => {
            res.redirect("/movies")
        })
        .catch(err => console.log(err))
})

module.exports = router;