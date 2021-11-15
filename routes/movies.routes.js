// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.models")

const Celebrity = require("../models/Celebrity.model")

// all your routes here
router.get("/movies/create", (req, res) => {

  Celebrity.find()
    .then(allCelebrities => {
      res.render("movies/new-movie", { allCelebrities })
    })
    .catch(err => console.log(err))

})

  router.post("/movies/create", (req, res) => {
    const { titleM, genre, plot, cast } = req.body;
   
  Movie.create({titleM, genre, plot})
  .then(movie => {
    //Para añadir el autor al modelo de book
    Celebrity.findByIdAndUpdate(movie, { $push: { cast: cast._id } }, { new: true })
      .populate("cast")
      .then(book => {
        res.render("movies/movies", book)
      })
      .catch(err => console.log(err))


  })
  .catch(err => console.log(err))
  });

   
  router.get("/movies/list-movies", (req, res) => {
   
    Movie.find()
    
    .then(allTheMovies => res.render("movies/movies", { allTheMovies}))
    .catch(err => console.log(err))

  });


module.exports = router;
    