// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// all your routes here


//ADD NEW MOVIE
router.get("/create" , (req, res, next) => {
    Celebrity.find()
    .then(cast => 
        res.render("./movies/new-movie", {cast})
    )
})

router.post("/create" , (req, res, next) => {
    const {title, genre, plot, cast} = req.body

    Movie.create( {title, genre, plot, cast} )
    .then((newMovie) => {
        console.log(newMovie);
        res.redirect('/movies'); 
    })
    .catch((err)=> {
        console.log("Error adding new movie: ", err)
        res.redirect("create");
    })
})



//MOVIE DETAILS 
router.get("/:id" , (req, res, next) => {
    let id = req.params.id;

    Movie.findById(id)
    .populate('cast')
    .then(movie => {
        res.render("./movies/movie-details", movie)
    })
    .catch((err)=> {
        console.log("Error displaying movie deets: ", err)
        res.redirect("/movies");
    })
})


//DELETE MOVIE
router.post("/:id/delete" , (req, res, next) => {
    let id = req.params.id;

    Movie.findByIdAndDelete(id)
    .then(deletedMovie => {
        console.log(deletedMovie);
        res.redirect('/movies'); 
    })
    .catch(err=> {
        console.log("Error deleting movie: ", err)
        res.redirect("/movies");
    })
})


//EDIT MOVIE
router.get("/:id/edit" , (req, res, next) => {
    let id = req.params.id
  
    Movie.findById(id)
    .populate("cast")
    .then(movie => {
        Celebrity.find()
        .then(celebsFound => {
            let allDetails = {movie}
            allDetails.celebs = celebsFound
            console.log(allDetails)
            res.render("./movies/edit-movie" , allDetails)
        })
        .catch(err => console.log("populateCelebs: ", err))
    })
    .catch(err=> {
        console.log("Error editing movie: ", err)
        res.redirect("/movies");
    })
})

router.post("/:id/edit" , (req, res, next) => {
    const id = req.params.id;

    const {title, genre, plot, cast} = req.body
    
    Movie.findByIdAndUpdate(id , {title, genre, plot, cast})
    .populate("cast") 
    .then( updatedMovie => {
      console.log(updatedMovie);
      res.redirect('/movies'); 
    })
    .catch((err) => {
      console.log("Error editing movie: ", err)
      res.redirect("edit");
    })
  });
  
  


//MAIN MOVIE PAGE
router.get("/" , (req, res, next) => {
    Movie.find().
    then(movieList => {
        console.log(movieList)
        res.render("./movies/movies" , {movieList})
    })
    .catch((err)=> {
        console.log("Error displaying movies: ", err)
        res.redirect("movies");
    })
    
})



module.exports = router;