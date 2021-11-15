// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// /1. Crear la vista del formulario para crear una celebrity

router.get("/new-movie", (req, res) => {
  res.render("movies/new-movie");
});
// /4. Crear el endpoint para crear libros.

router.post("/new-movie", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  //5. Realizar las operaciones en la BBDD o la lógica de negocio
  Movie.create({ title, genre, plot, cast })
    //6. Decidir que vista vamos a renderizar
    .then((movie) => res.render("movie-list", movie))
    .catch((err) => console.log("movies/new-movie"));
});

router.get("/movies", (req, res, next) => {
  Movie.find()

    .then((allTheMovies) => res.render("movies", { allTheMovies }))
    // ESTE EN ROJO DEBERIA SER EL ARRAY DE MOVIES

    .catch((err) => console.log(err));
});

router.get("/details/:id", (req, res, next) => {
  const { id } = req.params;
});

Movie.findById(id)
  .populate("title")
  .then((movie) => {
    console.log(movie);

    res.render("movie-details", movie);
  })
  .catch((err) => console.log(err));

module.exports = router;
