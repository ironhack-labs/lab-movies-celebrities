const express = require('express');
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const router = express.Router();


router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then(celebArr => {
            console.log(celebArr)

            const data = {
                celeb: celebArr
            }
            res.render("movies/new-movie", data);
        })
        .catch(error => next(error));

});

router.post("/movies/create", (req, res, next) => {

    const movieDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.celebrity
    }

    Movie.create(movieDetails)
    .then(movieFromDb => {
        // console.log("this is our req.body", req.body)
        res.redirect("/movies");
    })
    .catch(e => {
        console.log("Error trying to create a  new movie", e)
        next(e);
        res.redirect("/movies/create")
    });
})

router.get("/movies", (req, res, next) => {
    
    Movie.find()
    .then( moviesArray => {
        console.log(moviesArray);
        
        const data = {
            movie: moviesArray,
        }
        res.render("movies/movies", data);
    })
    .catch(e => {
        console.log("Error trying to create a  new celebrity", e)
        next(e);
    });
    
})

router.get("/movies/:id", (req, res, next) => {

    const { id } = req.params

    Movie.findById(id)
    // .populate("cast")
    .then(movieDetails => {
        console.log(movieDetails.cast)
        res.render("movies/movie-details", {movieDetails})
    })
    .catch(e => {
        console.log("error getting movie details from DB", e);
        next(e);
      });
    

});




module.exports = router;