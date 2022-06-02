// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();

const Movie = require("../models/Movie.model");

const Celebrity = require("../models/Celebrity.model");

// all your routes here

// Ruta GET para mostrar la lista de peliculas (la ruta es /movies)
router.get("/movies", (req, res) => {
    Movie.find()
        .then(peliculas => {
            res.render("movies/movies", { peliculas })
        })
        .catch(console.log)
})

router.get("/movies/create", (req, res) => {
    Celebrity.find()
        .then(celebridades => {
            res.render("movies/new-movie", { celebridades }) // <= la info de celebridades se pone como un objeto para poderla mostrar en el formulario ya que viene como un array de origen
        })
        .catch(console.log)
})

router.post("/movies/create", (req, res) => {

    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast })
        .then(nuevaPelicula => {
            console.log(nuevaPelicula)
            res.redirect(`/movies/${nuevaPelicula._id.toString()}`) // <= convertimos la variable nuevaPelicula en un objeto y ponemos ._id para entrar y usar el valor del ID
        })
        .catch(() => {
            res.render("/movies/create")
        })
})

router.get("/movies/:id", (req, res) => {

    Movie.findById(req.params.id)
        .populate("cast")
        .then(datosPelicula => {
            res.render("movies/movie-details", datosPelicula)
        })
        .catch(console.log)
})

router.post("/movies/:idPelicula/delete", (req, res) => {
    Movie.findByIdAndDelete(req.params.idPelicula)
        .then(() => {
            // Despues de borrar redirecciona a lista de peliculas
            res.redirect("/movies");
        })
        .catch(console.log)
})

router.get("/movies/:id/edit", (req, res) => {
    const actoresReales = [];

    Movie.findById(req.params.id)
        .populate("cast")
        .then(pelicula => {
            Celebrity.find()
                .then(celebridades => {
                    celebridades.forEach(celebridad => {
                        actoresReales.push({ celebridad, existe: false })
                    })

                    pelicula.cast.forEach(cast => {
                        actoresReales.forEach((cel, i) => {
                            if (cel.celebridad.id === cast.id) {
                                console.log("yep")
                                actoresReales[i].existe = true
                            }
                        })
                    })
                    res.render("movies/edit-movie", { pelicula, celebridades, actoresReales })
                })
                .catch(console.log)
        })
        .catch(console.log)
})


router.post("/movies/:id/edit", (req, res, next) => {


    Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedMovie => {
        res.redirect("/movies")
    })
    .catch(() => {
        res.redirect("/")
    })

})



module.exports = router; 