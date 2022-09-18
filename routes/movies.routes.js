// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
//Requerimos modelos
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// all your routes here

//Ruta para crear pelicula
//localhost:3000/movies/crete
router.get("/create", (req, res) => {
    Celebrity.find()
      .then((celebrities) => {
        console.log(celebrities);
        res.render("movies/new-movie", {celebrities: celebrities})
      })
      .catch(err => {console.log(err)})
})

//Ruta para recibir los datos del formulario
//localhost:3000/movies/crete
router.post("/create", (req, res) => {
    const { title, genre, plot } = req.body;

    if (title === '' || genre === '' || plot === '') {
        Celebrity.find()
            .then((celebrities) => {
                console.log(celebrities);
                res.render("movies/new-movie", {celebrities: celebrities, errorMessage:
                    'Please enter all the fields: title, genre and plot to login.'})
            })
            .catch(err => {console.log(err)})
            return;
    }else {
        Movie.create(req.body)
          .then(newMovie => {
            console.log(newMovie)
            res.redirect("/movies");
          })
          .catch(err => {console.log(err)})
        
        }
})

//localhost:3000/movies
router.get("/", (req, res) => {
    Movie.find()
      .then((movies) => {
        console.log(movies);
        res.render("movies/movies", {movies: movies})
      })
      .catch(err => {console.log(err)})
})

//Ruta para mostrar los detalles de cada pelicula
//localhost:3000/movies/:idMovie
router.get("/:idMovie", (req, res) => {
    const {idMovie} = req.params;//Destructuración para llegar a idMovie fácilmente
    console.log(idMovie);
    Movie.findById(idMovie)
        .populate("cast")
        .then(details => {
            console.log(details);
            res.render("movies/movie-details", details)
        })
        .catch(err => {console.log(err)})
})

//Ruta para borrar pelicula
//localhost:3000/movies/:idMovie/delete
router.post("/:idMovie/delete", (req, res) => {
    console.log(req.params.idMovie);
    Movie.findByIdAndRemove(req.params.idMovie)
        .then(moviefound => {
            console.log(moviefound);
            res.redirect("/movies")
        })
        .catch(err => {console.log(err)})
}) 

//Ruta para editar una peli
//localhost:3000/movies/:idMovie/edit
router.get("/:idMovie/edit", (req, res) => {
    console.log("QUERY", req.query)
    Movie.findOne(req.query.idMovie)
        .then(movie => {
            Celebrity.find()
                .then(cast => {
                    console.log(cast)
                    console.log(movie, cast);
                    res.render("movies/edit-movie", {movie, cast})
                })
                .catch(err => {console.log(err)})
        })
        .catch(err => {console.log(err)})
})

//Ruta para recibir los datos de editar una peli
//localhost:3000/movies/:idMovie/edit
router.post("/:idMovie/edit", (req, res) => {
    console.log(req.params.idMovie);
    Movie.findByIdAndUpdate(req.params.idMovie, req.body, {new:true})
        .then(found => {
            console.log(req.body)
            res.redirect(`/movies/${req.params.idMovie}`)
        })
        .catch(err => {console.log(err)})
})

module.exports = router;