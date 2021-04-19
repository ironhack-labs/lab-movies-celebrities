const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const router = express.Router();


router.get("/new", (req, res, next) => {
    Celebrity.find()
    .then((result) => {
        res.render("movies/new-movie.hbs", {celebs:result})
    }).catch((err) => {
        console.log(err);
        
    });
   
    
});
router.post("/new", (req, res, next) => {
    console.log(req.body.title);
    
    const {title,genre,plot} = req.body
    Movie.create({title: title, genre: genre, plot: plot})
    .then((result) => {
        console.log(result);
        
        Movie.findByIdAndUpdate(result._id, {$push:{cast: req.body.cast}})
        .then((result2)=>{
            console.log(result2);
            res.redirect("/movies/all")
            
        })
    }).catch((err) => {
        console.log(err);
        res.render("movies/new-movie.hbs")
    });
});

router.get(`/all`, (req, res) => {
  Movie.find({})
    .populate(`Celebrity`)
    .then((result) => {
      res.render("movies/movies.hbs", { movies: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;