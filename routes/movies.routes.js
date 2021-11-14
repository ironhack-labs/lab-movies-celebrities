const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get("/create", (req, res) => {
    Celebrity.find()
    .then(allCelebs => res.render("movies/new-movie", allCelebs))
    .catch(err => console.log(err))
    // res.render("movies/new-movie");
})

router.post("/create", (req, res) => {
    const { title, genre, plot,cast } = req.body;
  
    Movie.create({ title, genre, plot, cast })
      .then(celeb => res.render("index", celeb))
      .catch(err => console.log(err))
})

router.get("/movies", (req, res) => {

    Movie.find()
      .then(allMovies => res.render("movies/movies", { allMovies }))
      .catch(err => console.log(err))
});

router.get("/:id", (req, res) => {
    const id = req.params.id
  
    Movie.findById(id)
      .populate("celebrity")
      .then(movie => {
        res.render("movies/movie-details", movie)
      })
      .catch(err => console.log(err))
});

router.post("/:id/delete", (req, res) => {
    const id = req.params.id
    Movie.findByIdAndDelete(id)
    .then(console.log(id))
      .then(res.render("index"))
      .catch(err => console.log(err))

});

router.get("/:id/edit", (req, res) =>{
    const id = req.params.id

    Movie.findById(id)
        .then(movie => res.render("movies/edit-movie", movie))
        .catch(err => console.log(err))
})

router.post("/:id", (req, res) => {
    const { title, genre, plot, cast } = req.body;
    const id = req.params.id;
  
    Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true})
        .then(updatedMovie => res.render("movie-details", updatedMovie))
        .catch(err => console.log(err))
})

module.exports = router;
