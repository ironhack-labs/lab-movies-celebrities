// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

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
    .then((Celebrities) => res.render("movies/new-movie", Celebrities))
      .catch((error) => res.render("error"));
    });
  
    router.post("/movies/create", (req, res, next) => {
      // console.log(req.body);
      const { title, genre, plot, cast } = req.body;
  
      Movie.create({ title, genre, plot, cast })
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
      Movie.findByIdAndRemove( id )
      .then(() => res.redirect("/movies"))
      .catch(error => next(error));
    });
  

module.exports = router;