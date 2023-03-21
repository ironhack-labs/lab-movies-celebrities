// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
// all your routes here


const Movie = require("../models/Movie.model");



// all your routes here

router.get("/movies/create", (req, res, next) => {

    Celebrity.find()
        .then(celebritiesArr => {
            const data = {
                celebrities: celebritiesArr
            }

            res.render("movies/new-movie", data);
        })
        .catch((e) => {
            console.log(`Something wrong with creating movie`, e);
        })



})

router.post("/movies/create", (req, res, next) => {


    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.create(movieDetails)
        .then((movieFromDB) => {
            res.redirect("/movies/create");
        })
        .catch((e) => {
            console.log(`Something wrong with creating movie`, e);
        });
});

router.get("/movies", (req, res, next) => {

    Movie.find()
        .populate("cast")
        .then(listFromDB => {
            console.log(listFromDB[0].cast);
            const data = {
                movie: listFromDB
            }
            res.render("movies/movies", data);
        })


        .catch(e => {
            console.log(`Something wrong with loading movies`, e)
        })
})

router.get("/movies/:movieId", (req, res, next) => {
    const { movieId } = req.params;
    Movie.findById(movieId)
        .populate("cast")
        .then(movieDetails => {
            res.render("movies/movie-details", movieDetails)
        })
        .catch((e) => {
            console.log(`Something wrong with creating movie`, e);
        })
})

router.post("/movies/:movieId/delete", (req, res, next) => {

    const { movieId } = req.params;
    Movie.findByIdAndDelete(movieId)
        .then(() => {
            res.redirect("/movies");
        })
        .catch((e) => {
            console.log(`Something wrong with deleting movie`, e);
        })
})



// update movies

router.get("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params;

    Movie.findByIdAndDelete(id)
        .then((movieToEdit) => {
            res.render("movies/edit-movie", { movie: movieToEdit });
        })
        .catch((e) => {
            console.log(`Something wrong with updating movie`, e);
        })

})

router.post("/movies/:id/edit", (req, res, next) => {

    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    const { id } = req.params;

    Movie.findByIdAndUpdate(id, movieDetails, { new: true })
        .then((movieEdited) => {
            res.redirect(`/movies/${movieEdited.id}`);
        })
        .catch((e) => {
            console.log(`Something wrong with updating movie`, e);
        })
});



module.exports = router;