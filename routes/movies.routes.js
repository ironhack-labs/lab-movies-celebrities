const router = require("express").Router();

const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model");

// all your routes here
//Show a form to create a movie
router.get("/movies/create", (req, res, next) => {

    let celebrities;
  
    Celebrity.find()
        .then( (celebritiesFromDB) => {
            celebrities = celebritiesFromDB;
            
            console.log(celebritiesFromDB);
  
            res.render("movies/new-movie", { celebrities: celebrities });
        })
        .catch(err => {
            console.log("Error creating movies details from DB...", err);
            next();
        });
  });
 //Send the data from the form to this route to create the movie and save it to the database
 router.post("/movies/create", (req, res, next) => {

    const {title, genre, plot, cast} = req.body;
    Movie.create({title, genre, plot, cast})
      .then(moviesDetails => {
          res.redirect("/movies")
      })
      .catch(err => {
         res.render("movies/new-movie") 
      })
 });

 //display a list of all the movies
router.get("/movies", (req, res, next) => {
    Movie.find()
      .then((moviesFromDB) => {
       
        res.render("movies/movies", { movies: moviesFromDB });
      })
      .catch((err) => {
        console.log("error getting movies from DB", err);
        next();
      });
  });
  
//READ: Movies details
router.get("/movies/:id", (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .populate("cast")
    .then((movieDetails) => {
      res.render("movies/movie-details", movieDetails);
    })
    .catch((err) => {
      console.log("error getting movie details from DB", err);
      next();
    });
});
 //Update Show a form to edit a movie
 router.get("/movies/:id/edit", (req, res, next) => {

    let celebritiesArr;

    Celebrity.find()
        .then( (celebritiesFromDB) => {
            celebritiesArr = celebritiesFromDB;
            return Movie.findById(req.params.id)
        })
        .then((movieDetails) => {
            const data = {
                movieDetails : movieDetails,
                celebritiesArr : celebritiesArr
            }

            res.render("movies/edit-movie", data);
        })
        .catch(err => {
            console.log("Error getting movie details from DB...", err);
            next();
        });
});

//UPDATE: process form: Send the data from the form to this route to update the specific movie
router.post("/movies/:id/edit", (req, res, next) => {
    const id = req.params.id;

    const newDetails = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.findByIdAndUpdate(id, newDetails)
        .then(() => {
            res.redirect(`/movies/${id}`);
        })
        .catch(err => {
            console.log("Error updating movie...", err);
            next();
        });
});

//DELETE
router.post("/movies/:id/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/movies");
        })
        .catch(err => {
            console.log("Error deleting movie...", err);
            next();
        });

});

module.exports = router;

