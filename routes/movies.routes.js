// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then((celebs) => {
        res.render("movies/new-movie",{celebs});});
  });
  
  router.post("/movies/create", (req, res, next) => {
     return Movie.create(req.body)
      .then(() => {
        return Movie.find()
          .then((movies) => {
          res.redirect("/movies");})
      })
      .catch((error) => {
        console.log("error",error);
          res.render("movies/new-movie");
      });
  });
  
  router.get("/movies", (req, res, next) => {
      return Movie.find()
      .then((movies) => {
        res.render("movies/movies",{movies});
      })
      .catch((error) => {
          console.log("error",error);
      });
    });

router.get("/movies/:id", (req, res, next) => {
    return Movie.findById(req.params.id)
        .populate('cast')
        .then((movie) => {
        console.log(movie);
        res.render("movies/movie-details",{movie});})
        .catch((error) => {
            console.log("error",error);
        });
    });

router.post("/movies/:id/delete", (req, res, next) => {
    console.log(req.params);
        return Movie.findByIdAndRemove(req.params.id)
         .then(() => {
             res.redirect("/movies");})
         .catch((error) => {
           console.log("error",error);
         });
    });

router.get("/movies/:id/edit", (req, res, next) => {
        return Movie.findById(req.params.id)
            .populate('cast')
            .then((movie) => {
                Celebrity.find()
                .then((celebs) => {
                    res.render("movies/edit-movie",{movie,celebs});
                })
                .catch((error) => {
                    console.log("error",error);
                })
            })
            .catch((error) => {
                console.log("error",error);
            });
    });

router.post("/movies/:id", (req, res, next) => {
            return Movie.findByIdAndUpdate(req.params.id,req.body)
             .then(() => {
                 res.redirect("/movies");})
             .catch((error) => {
               console.log("error",error);
               res.redirect("/movies/:id");
             });
    });

module.exports = router;