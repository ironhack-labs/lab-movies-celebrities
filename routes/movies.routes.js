const { application } = require("express");
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();
const mongoose = require("mongoose");

// all your routes here


router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
  .then((celebFromDb) => {
    
    res.render('./movies/new-movie', {celebrity: celebFromDb});
  })
  .catch(err => {
    console.log(err)
  })
});




router.post('/movies/create', (req, res, next) => {
    console.log({info: req.body})
    const movieToCreate = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Celebrity'
        }]
    }

    Movie.create(movieToCreate)
    .then(() => {

        
        res.redirect("/movies")
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;