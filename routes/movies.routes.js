// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

//Create
router.get("/create", (req,res,next)=>{
    res.render("movies/new-movie")
})

router.post("/create",(req,res,next) => {
    const { title, genre, plot, _cast} = req.body
    Movie.create( { title, genre, plot, _cast} )
   .then (movies => {
    res.redirect("movies")
   })        
   .catch (error => res.render("movies/new-movie"))
})

//Movie list
router.get("/movies", (req,res,next) => {
    Movie.find()
    .then(movies =>{
        res.render("movies/movies", { movies })
    })
    .catch(error => next(error))
})

//Movie details
router.get("/movies/:id/detail", (req,res,next) => {
    const { id } = req.params

    Movie.findById(id)
    .populate("_cast")
    .then(movie =>{
        res.render("movies/movie-details", { movie })
    })
    .catch(error => next(error))
})

//Movie delete
router.get("/movies/:id/delete", (req,res,next)=>{
    const { id } = req.params
    
    Movie.findByIdAndDelete(id)
    .then(() => {
        res.redirect("/movies/movies")
    })
    .catch(error => next(error))
})

//Movie edit
router.get("/movies/:id/edit", (req,res,next) => {
    const { id } = req.params

    Movie.findById(id)
    .populate("_cast")
    .then(movie =>{
        res.render("movies/edit-movie", { movie })
    })
    .catch(error => next(error))
})

router.post("/:id/edit", (req, res, next) => {
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    
    Movie.findByIdAndUpdate(id, 
    {
      title: title,
      genre: genre,
      plot: plot,
      cast: cast
    })
    .catch((error) => {res.redirect("movies/movie-details")
    })
})

module.exports = router;