// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movies = require("../models/Movie.model")
const express = require("express");

// ADD movies

router.get("/movies/create", (req,res,next)=> {
    res.render('/movies/new-movies')
})

router.post("/movies/create", (req,res,next)=>{
    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
      };

      Movies.create(movieDetails)
      .then(()=>{
        res.redirect("/movies")
      })
      .catch((e) => {
      console.log(`Something wrong with creating movie`, e);
    });
      
})
module.exports = router;