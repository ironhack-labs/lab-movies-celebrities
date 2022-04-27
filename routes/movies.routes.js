// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here


router.get("/movies", (req, res) => {
    Movie.find()
        .then(peliculas => {
            //[ {peli},{peli},{peli} ]
            res.render("movies/movies", { peliculas })
        })
        .catch(console.log)
})


router.get("/movies/create", (req, res) => {
    Celebrity.find()
        .then(celebridades => {
            res.render("movies/new-movie", { celebridades })
        })
        .catch(console.log)
})

router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
        .then(nuevaPelicula => {
            console.log(nuevaPelicula)
            res.redirect(`/movies/${nuevaPelicula._id.toString()}`)
        })
        .catch(console.log)
})


router.get("/movies/:id", (req, res) => {
    console.log("entro al detalle")
    Movie.findById(req.params.id)
        .populate("cast")
        .then(datosPelicula => {
            console.log(datosPelicula)
            // { title: "", genre: "", plot: "", cast: ["id1","id2"] }
            res.render("movies/movie-details", datosPelicula)
        })
        .catch(console.log)
})


router.post("/movies/:idPelicula/delete", (req, res) => {
    Movie.findByIdAndDelete(req.params.idPelicula)
        .then(() => {
            res.redirect("/movies");
        })
        .catch(console.log)
})

router.get("/movies/:id/edit", (req, res) => {
    const actoresReales = [];

    Movie.findById(req.params.id)
        .populate("cast")
        .then(pelicula => {
            // console.log(pelicula)
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


router.post("/movies/:id/edit", (req, res) => {
    res.send(req.body)
})

module.exports = router;