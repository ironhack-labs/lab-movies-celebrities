const router = require("express").Router();

const Movie = require("../models/Movie.model");
// const Celebrity = require("../models/Celebrity.model");

// RUTA A CREAR PELICULAS (GET)
router.get("/crear", (req, res, next) => {
    res.render("movies/new-movie")
});

// RUTA A CREAR PELICULAS (POST)
router.post("/crear", (req, res, next) => {

    const { title, genre, plot, cast } = req.body
    console.log(title, genre, plot, cast )
    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect("/peliculas"))
        .catch(err => res.render("movies/new-movie"))
});



//RUTA LISTADO PELICULAS
router.get("/", (req, res, next) => {

    Movie
        .find()
        .then((movie => res.render("movies/movies", { movie })))
        .catch(err => console.log(err))

});

module.exports = router;