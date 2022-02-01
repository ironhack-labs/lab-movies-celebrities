const express = require("express");
const router = express.Router();

//Requerimos movie model y celebrity model
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");


// ruta para renderizar las movies creadas
router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) => console.log(err));
});


// tenemos que volver a meter celebrities con direccion movies para que nos salgan en 
// el scroll de casting.
router.get("/create", (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
      // console.log(celebrities);
      res.render("movies/new-movie", { celebrities });
    });
  });




// ruta donde creamos las movies GET
router.get("/create", (req, res, next) => {
  res.render("movies/new-movie", {});
});


// ruta donde creamos las movies POST
router.post("/create", (req, res, next) => {
  Movie.create(req.body)
    .then((movie) => {
     // console.log(movie);
      res.redirect("/movies");
    })
    .catch((err) => {
        //si nos da error volvemos a new movie
      res.render("movies/new-movie");
    });
});

router.get("/new-movie", (req, res, next) => {
  res.render("movies/new-movie");
});


// ruta para crear movie-details
router.get("/:id", (req, res, next) => {
    Movie.findById(req.params.id)
      .populate("cast") // para integrar el casting a la hora de crear la ruta a details
      .then((movie) => {
        // console.log(movie);
        res.render("movies/movie-details", { movie });
      })
      .catch((err) => console.log(err));
  });


  router.post("/:id/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
      .then((deletedMovie) => {
        console.log(`${deletedMovie} has been deleted`);
      })
      .catch((err) => console.log(err))
      .then(() => { //al terminar de borrar redirigimos a /movies
        res.redirect("/movies");
      });
  });



module.exports = router;