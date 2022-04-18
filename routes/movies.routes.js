const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const { redirect } = require('express/lib/response');


// ------------------
// MOVIES LISTING
// ------------------

router.get("/", (req, res, next) => {

    Movie
    .find()
    .then((movies)=> res.render("movies/movies", {movies}))
    .catch((err)=> console.log(err));
})


// ------------------
// MOVIES CREATING
// ------------------

router.get("/create", (req, res, next) => {
    
    Celebrity
    .find()
    .then ((celebrities) => res.render ("movies/new-movie", {celebrities}))
   
})


router.post("/create", (req, res, next) => {

    const {title, genre, plot, cast } = req.body

    Movie
     .create ({title, genre, plot, cast})
     .then(()=> res.redirect("/movies"))
     .catch(err =>{ 
         res.redirect("/movies/new-movie")
     })
   
})

    
      
router.get("/:id", (req, res, next) => {
    
    const { id } = req.params

    Movie
    .findById(id)
    .populate('cast')
    .then(movie => res.render("movies/movie-details", movie))
    .catch(err => console.log(err))
    
})  


 // ------------------
// MOVIES UPDATE
// ------------------ 

router.get("/:id/edit", (req, res, next) => {

    const { id } = req.params

    Movie
      .findById(id)
      .then(movie => {
          Celebrity
            .find()
            .then(celebrities => {
                celebrities.forEach(celebrity => celebrity.isPresent = false)
                movie.cast.forEach(movieCeleb => {
                    celebrities.forEach(celebrity => {
                        if (celebrity.id == movieCeleb) celebrity.isPresent = true
                    })
                })
                res.render('movies/edit-movie', { movie, celebrities })
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

      
router.post("/:id/edit", (req, res, next) => {
    
    const { id } = req.params
    const { title, genre, plot, cast } = req.body;
      
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect("/movies"))
        .catch(err => {
            res.redirect(`/movies/${id}`)
            console.log(err)
       })
    
})

 // ------------------
// MOVIES DELETE
// ------------------     
      
router.post("/:id/delete", (req, res, next) => {

    const { id } = req.params;
    
    Movie
        .findByIdAndDelete(id)
        .then(movie => res.redirect("/movies"))
        .catch((err) => console.log(err))
    })
      

 module.exports = router  