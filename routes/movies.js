const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')
const Movie = require("./../models/Movie.models");



router.get("/movies/create", (req, res) => {
  Celebrity.find().then((celebs) => {
    res.render("movies/new-movie", { celebs });
  });
});

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((movie) => {
      res.redirect("/movies");
    })
    .catch(() => res.render("movies/new-movie", ));
});

router.get("/movies", (req, res) => {
  Movie.find().then((movies) => {
    res.render("movies/movies", { movies: movies });
  });
});


router.get("/movies/:id", (req, res) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie: movie });
    });
});

//////// delet movies /////////////

router.post("/movies/:id/delete", (req, res) =>{
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
    .then(() =>{res.render("/movies")
    })

});


//////// Edit movies /////////////

router.get("/movies/:id/edit", (req, res) =>{
const { id } = req.params;

  Movie.findById(id)
    .then(movie => res.render("/edit-movie", movie))
    .catch(err => console.log(err))
});

router.post("/movies/:id/edit-movie", (req, res) =>{
    const { title, genre, plot, cast } = req.body;
    const { id } = req.params;

    Movie.findByIdAndUpdate(id, req.body, {new: true})
    .then(updateMovie => res.render("/movies", updateMovie))
    .catch(err => console.log(err))
});



module.exports= router;


