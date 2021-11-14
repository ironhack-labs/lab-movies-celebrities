const router = require("express").Router();

const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res) => {
    res.render("movies/new-movie")
  })

router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast} = req.body;

    Movie.create({ title, genre, plot, cast})

      .then(movie => res.render("movies/new-movie", movie))
      .catch(err => console.log(err))

    })

router.get("/movies", (req, res) => {
     
        Movie.find()
            .then(allTheMovies => res.render("movies/movies", { allTheMovies }))
            .catch(err => console.log(err))

          });

 router.get("/movies/:id", (req, res) => {
    const id = req.params.id;

    Movie.findById(id)
      .populate("celebrity")
      .then(movie => {
        res.render("movies/movie-details", movie)
      })
      .catch(err => console.log(err))
});

router.post("/movies/:id/delete", (req, res) =>{
    const {id} = req.params;
    Movie.findByIdAndDelete(id)
    .then(() =>{res.render("/movies")
    })
})

module.exports = router; 
