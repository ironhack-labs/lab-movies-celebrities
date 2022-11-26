// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//ruta para crear movie 
router.get("/movies/create", async (req, res) => {
    try{
        const celebrities = await Celebrity.find();
        res.render("movies/new-movie" , { celebrities });
    }
    catch (err) {
        console.log(err)
    }
});

//obtener info del form de crear movie 

router.post("/movies/create", async (req, res) => {
    try {
        const { title, genre, plot, cast } = req.body;
        const newMovie = await Movie.create({ title, genre, plot, cast});
        res.redirect("movies");
    }
    catch (err) {
        console.log(err);
        res.redirect("movies/create")
    }
});

// ruta para mostrar all movies
router.get("/movies/movies", async (req, res) => {
    try {
      const movies = await Movie.find();
      res.render("movies/movies", { movies });
    }
    catch (err) {
      console.log(err)
    }
});

// ruta para mostrar los movie details
router.get("/movies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await Movie.findById(id).populate("cast");
      res.render("movies/movie-details", movie);
    }
    catch (err) {
      console.log(err)
    }
});


// ruta para poder delete a movie
router.post("/movies/:id/delete", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMovie = await Movie.findByIdAndRemove(id);
      res.redirect("/movies/movies");
    }
    catch (err) {
      console.log(err)
      res.redirect("/movies/movies");
    }
});

//ruta para editar movie con get 
router.get("/movies/:id/edit", async (req, res) => {
    try {
      const { id } = req.params;
  
      const celebrities = await Celebrity.find();
      const editMovie = await Movie.findById(id).populate("cast");
      const { cast } = editMovie;
  

  
      const data = { movie: editMovie, celebrities: celebrities }
      res.render("movies/edit-movie", data );
    }
    catch (err) {
      console.log(err)
    }
  });

// Edit movie con post 
router.post("/movies/:id/edit", async (req, res) => {
    try {
      const { id } = req.params;
      const editMovie = await Movie.findByIdAndUpdate(id, req.body, {new: true});
      res.redirect(`/movies/${id}`);
    }
    catch (err) {
      console.log(err)
      res.redirect("/movies/movies");
    }
});
module.exports = router;