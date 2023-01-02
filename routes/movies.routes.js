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

    const {name, title, genre, plot, cast} = req.body;
    Movie.create({name, title, genre, plot, cast})
      .then(moviesDetails => {
          res.redirect("/movies")
      })
      .catch(err => {
         res.render("movies/new-movie") 
      })
 });

module.exports = router;

