const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here


router.get("/details/:id", (req,res, next) => {
  const { id } = req.params
  Movie.findById(id)
  .populate('cast')
  .then((result)=>{
    console.log(result)
    res.render("movies/movie-details", {result})})
})


router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
  .then((Celebrity) => res.render("movies/new-movie", Celebrity))
    .catch((error) => res.render("error"));
  });

  router.post("/movies/create", (req, res, next) => {
    // console.log(req.body);
    const { title, genre, plot, cast } = req.body;
  
    Movie.create({ title, genre, plot, cast })
      // .then(bookFromDB => console.log(`New book created: ${bookFromDB.title}.`))
      .then(() => res.redirect("/movies"))
      .catch((error) => res.render("movies/new-movie"));
  });
  
  router.get("/movies", (req, res, next) => {
    Movie.find()
    .then((Movie) => res.render("movies/movies", Movie))
    .catch((error) => res.render("error"));
    
  });

  router.post("/movies/:id/delete", (req, res, next) => {
    // console.log(req.body);
    const  id  = req.params.id
    Movie.findByIdAndDelete( id )
    .then(() => res.redirect("/movies"))
    .catch(error => next(error));
  });


module.exports = router;