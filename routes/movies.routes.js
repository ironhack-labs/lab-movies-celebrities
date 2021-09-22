// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");

// all your routes here
//muestra el formulario
//crear todas las pelis
router.get("/movies/create", (req, res) => {
    res.render("movies/new-movie")
})

//esta ruta recibe la info del formulario 
router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body 
    Movie.create({
        title,
        genre,
        plot,
        cast
    })
        .then((newMovie) => {
            console.log(newMovie)
            res.render("movies/movies")
        })
        .catch((e) => {
            console.log(e)
        })
})

//mostrar todas las pelis
router.get("/movies", (req, res) => {
   Movie.find()
    .then((movies) => {
        const list = movies
        console.log(list)
        res.render("movies/movies", {movies: list})
    }) 
    .catch((e) => {
        console.log(e)
    })
})

router.get("/movies/:id", (req, res) => {
    const { id } = req.params
    Movie.findById(id)
    .populate("cast")
    .then((details) => {
        console.log(details)
        res.render("movies/movie-details", {movies: details})
    })
    .catch((e) => {
        console.log(e)
    })
  })

  router.post("/movies/:id/delete", (req, res) => {
    const { id } = req.params
    Movie.findByIdAndRemove(id)
      .then(() => {
        res.redirect("/movies/movies")
      })
      .catch((e) => {
        console.log(e)
      })
  })

  router.get("/movies/:id/edit", (req, res) => {
    const {id} = req.params
    Movie.findById(id)
    .populate("cast")
    Celebrity.findOne({name: name})
    .then((edit) => {
    res.render("movies/edit-movie", {edit})
  })
    .catch((e) => {
    console.log(e)
  })
})
  
router.get("/movies/:id", (req, res) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() =>{
    res.redirect("/movies/movies")
    })
    .catch((e) => {
        console.log(e)
      })
  })

module.exports = router;