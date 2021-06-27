// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const Celebrities = require("../models/Celebrity.model");
const Movies = require("../models/movies.model");

// todas las rutas localhost:3000/movies/.... Y SOLO ESTAS
const router = require("express").Router();

// all your routes here

router.get("/", (req, res) => {
    res.render("movies/movies")
    //res.redirect("/") para volver a inicio
})

router.get("/add-movies", (req, res) => {


    Celebrities.find()
        .then(Celebridad => res.render("movies/new-movie", { Celebridad }))
    //res.redirect("/") para volver a inicio
})

router.post('/add-movie', (req, res) => {
    res.send(req.body)


    const { title, genre, plot, cast } = req.body
    console.log(cast)
    // castArray.push(cast)
    //  console.log(typeof cast)
    Movies
        .create({ title, genre, plot, cast })
        ///     .populate('´cast')
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

router.get("/movies-list", (req, res) => {///si recibo en la url /celebrities-list

    Movies
        .find()
        .then(moviess => {
            res.render("movies/movies-list", { moviess })
            console.log(moviess)
        })
        .catch(err => console.log(err))

    //entonces sacame celebrities-list.hbs que esta en la carpeta celebrities
    //res.redirect("/") para volver a inicio
})


////////detalles
router.get("/movies-list/:movie_id", (req, res) => {///si recibo en la url /celebrities-list


    const { movie_id } = req.params

    console.log("console de movie_id", movie_id)

    Movies
        .findById(movie_id)
        .populate('cast')
        .then(movieIded => {
            res.render("movies/movie-details", movieIded)
            //console.log(moviess)
            console.log("console de movieIded", movieIded)
        })
        .catch(err => console.log(err))

    //entonces sacame celebrities-list.hbs que esta en la carpeta celebrities
    //res.redirect("/") para volver a inicio
})

router.get("/movies-list/:movie_id/delete", (req, res) => {///si recibo en la url /celebrities-list






    router.post("/movies-list/:movie_id/delete", (req, res) => {
        res.send(req.body)


        const { id } = req.body

        Movies
            .findByIdAndRemove({ id })
            ///     .populate('´cast')
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
    })



    ///////////////////////////////////////////////////////////


    //entonces sacame celebrities-list.hbs que esta en la carpeta celebrities
    //res.redirect("/") para volver a inicio
})



module.exports = router;