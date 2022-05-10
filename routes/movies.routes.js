const router = require("express").Router();
const MovieModel = require ("../models/Movie.model")
//1. crear una ruta get

router.get ("/create", (req, res, next) =>{


    res.render("movies/new-movie.hbs")
})


// 2.crear una ruta post
router.post("/create", (req, res, next) => {
 
    console.log ("probando ruta")
    console.log (req.body)

    const { title, genre, plot, cast } = req.body
    
    MovieModel.create({
       title,
       genre,
       plot,
       cast
    })
    
    .then((response) => {
    res.redirect ("/movies")
    })
    .catch((err) =>{
        next (err)
    })

})


//3. crear ruta get para listar

router.get ("/movies", (req, res, next) =>{
    MovieModel.find()
    .then ((peliculas) =>{

        res.render("movies/movies.hbs", {
            listPeliculas: peliculas
        })
    })
    .catch((err) => {
        next(err)
    })
})


module.exports = router;