// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model")

router.get("/movies", (req, res, next) => {
    
    Movie.find(() => {}) 
     .then((foundMovies) => {
      res.render("movies/movies-view", { moviesList: foundMovies});
    })
    .catch((err)=> {
        console.log(err);
    })
    
  });

// all your routes here

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then ((celebsList) => {
            res.render("movies/new-movie", { celebsList });
        })
        .catch((err)=>{
            console.log(err);
        })
    
  });

router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast})
        .then((createdMovie) => {
            res.redirect("/movies")
        })
        .catch((err)=> {
            console.log(err);
            res.render("movies/new-movie.hbs")
        })
})

router.get("/:movieId", (req, res, next) => {
    Movie.findById(req.params.movieId)
    .populate("cast") 
    .then((foundMovie) => {
      res.render("movies/movies-details", { foundMovie });
    })
    .catch((err)=> {
        console.log(err);
    })
    
  });


module.exports = router;