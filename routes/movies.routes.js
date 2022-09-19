const router = require("express").Router();
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here


router.get("/movies", (req, res) => {
    Movie.find()
        .then(movies => {
            res.render("movies/movies", { movies })
        })
        .catch((err)=>console.log(err))
})


router.get("/movies/create", (req, res) => {
    Celebrity.find()
        .then(celebridades => {
            res.render("movies/new-movie", { celebridades })
        })
        .catch((err)=>console.log(err))
})

router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
        .then(nuevaPelicula => {
            res.redirect(`/movies`)
        })
        .catch((err)=>console.log(err))
})


router.get("/movies/:id", (req, res) => {
    Celebrity.findById(req.params.id)
        .populate("cast")
        .then(datosPelicula => {
            res.render("movies/movie-details", datosPelicula)
        })
        .catch((err)=>console.log(err))
})

router.post("/movies/:idPelicula/delete", (req, res) => {
    Movie.findByIdAndDelete(req.params.idPelicula)
        .then(() => {
            res.redirect("/movies");
        })
        .catch((err)=>console.log(err))
})

router.get("/movies/:id/edit", (req, res) => {
    const array = [];

    Movie.findById(req.params.id)
        .populate("cast")
        .then(pelicula => {
            Celebrity.find()
            .then(celebridades => {
            celebridades.forEach(celebridad => {
            array.push({ celebridad, existe: false })
            })

            pelicula.cast.forEach(cast => {
            array.forEach((cel, i) => {
            if (cel.celebridad.id === cast.id) {
                array[i].existe = true
            }
            })
            })
            res.render("movies/edit-movie", { pelicula, celebridades, array })
             })
                .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err))
})


router.post("/movies/:id/edit", (req, res) => {
    res.send(req.body)
})

module.exports = router;