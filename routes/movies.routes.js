const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");


// RUTA A CREAR PELICULAS (GET)
router.get("/crear", (req, res, next) => {
    Celebrity
        .find()
        .then(CelebName => res.render("movies/new-movie", { CelebName }))

});

// RUTA A CREAR PELICULAS (POST)
router.post("/crear", (req, res, next) => {

    const { title, genre, plot, cast } = req.body

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

//RUTA DETALLE PELICULAS
router.get("/:movie_id", (req, res, next) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
        .populate("cast")
        .then(movie => res.render("movies/movie-details", movie))
        .catch(err => console.log(err))
})

//RUTA EDITAR PELICULAS (GET)
router.get("/:movie_id/editar", (req, res, next) => {

    const { movie_id } = req.params

    Movie
        .findById(movie_id)
    // Celebrity
    //     .find()
    //     .then(allDetails =>{
    //         res.render("movies/edit-movie", allDetails)
    //     })

        .populate("cast")
        //     .then(theMovie => {
        //         return Movie.find()
        //     })
        //     .then(allDetails =>{})
        // Celebrity
        //     .find()
        .then((movDetails) => res.render("movies/edit-movie", movDetails))
        .catch(err => console.log(err))
})
//RUTA EDITAR PELICULAS (POST)
router.post("/:movie_id/editar", (req, res, next) => {

    const { movie_id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(movie_id, { title, genre, plot, cast }, { new: true })
        .then(() => res.redirect("/peliculas"))
        .catch(err => console.log(err))
})

//RUTA BORRAR PELICULAS
router.post("/:movie_id/eliminar", (req, res, next) => {

    const { movie_id } = req.params

    Movie
        .findByIdAndDelete(movie_id)
        .then(() => res.redirect("/peliculas"))
        .catch(err => console.log(err))

})

module.exports = router