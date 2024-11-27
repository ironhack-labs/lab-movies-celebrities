// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const express = require("express");

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/movies/create", (req,res,next)=>{
   
   Movie.find()
    .populate("celebrity")
    .then((celebritiesFromDB)=>{
       
        res.render("movies/new-movie",{celebritiesArr: celebritiesFromDB} )
    })
    .catch((e) => {
        console.log("error creating a new movie", e);
        next(e);
      });
})


router.post("/movies/create", (req,res,next)=>{

    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    };

    Movie.create(newMovie)
        .then((newMovie)=>{
            res.redirect("/movies");
        })

        .catch((e) => {
            console.log("error creating a new movie", e);
            next(e);
      });
})


router.get("/movies", (req, res, next)=> {

    Movie.find()
    .populate("celebrity")
    .then((moviesFromDB)=>{
        const data = {
            movies: moviesFromDB,
        };
        res.render("movies/movies", data);
    })

    .catch((e) => {
        console.log("error seeing movie list", e);
        next(e);
  });

})

module.exports = router;