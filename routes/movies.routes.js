const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// RUTA A CREAR PELICULAS (GET)
router.get("/crear", (req, res, next) => {

    const { cast } = req.body

    Movie
    .findById(cast)
    .populate('name')
        .then(name => res.send(`Hola ${Movie}`))

    // INTENTAR ESTO DE NUEVO, HE MODIFICADO EL MODELO DE CELEBRITIES PARA PONER A MONGOOSE EN UNA VARIBLE Y APARENTEMENTE LLEVARMELO A MOVIES. INTENTAR VER SI CAST O MOVIE ARROJAN ALGOEN LA CONSOLA
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

module.exports = router