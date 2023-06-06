const router = require("express").Router();
const Movie = require("../models/movie.model");
const Celebrity = require("../models/Celebrity.model");





router.get("/movies/create", (req, res, next) => {
       
    Celebrity.find()
        .then((allCalebrities) => {
            //console.log(allCalebrities)
            res.render("movies/new-movie", {celebrity: allCalebrities})
    })
})

router.post("/movies/create", (req, res, next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

        Movie.create(newMovie)
        .then((data) => {
            console.log(data)
            res.redirect("/movies")
        })
        .catch((err) => {
            console.log("Ops, we failed", err)
            next(err)
        });
})

router.get("/movies", (req, res, next) => {
    
        Movie.find()
            .then((allMovies) => {
                const data = {
                    movies: allMovies
                }
                res.render("movies/movies", data)   
            })
            .catch((err) => {
                console.log("oPS", err)
                next(err)
            });
})

router.get("/movies/:id", (req, res, next) => {
    const id = req.params.id;
    
    Movie.findById(id)
         .populate("cast")
         .then((movie) => {
            res.render("movies/movie-details", movie)
        })
         .catch((err) => {
            console.log(" error to display details", err)
            next(err)
        });
})

router.post("/movies/:id/delete", (req, res, next) => {
    const {id} = req.params

    Movie.findByIdAndDelete(id)
         .then((deletedMovie) => {
            res.redirect("/movies")
        }).catch((err) => {
            console.log("error to delete", err)
            next(err)
        });
})



router.get("/movies/:id/edit", (req, res, next) => {
    const {id} = req.params
    let movie;
    Movie.findByIdAndUpdate(id)
         .then((movie) => {
            movie = movie

            console.log(movie)
            return Celebrity.find()
        })
         .then((allCelebs) => {
            res.render("movies/edit-movie", {movies: movie, celebs: allCelebs})
         })
         .catch((err) => {
            console.log("error to edit", err)
            next(err)
        });
})

router.post("/movies/:id", (req, res, next) => {
    const id = req.params.id;
    
    const updatedMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    
    Movie.findByIdAndUpdate(id)
          .then((updatedMovieFromDB) => {
          res.redirect("/movies/movie-details")  
        }).catch((err) => {
            console.log("another error", err)
            next(err)
        });

})


module.exports = router;
