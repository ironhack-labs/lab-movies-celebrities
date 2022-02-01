const router = require("express").Router();

const res = require("express/lib/response");
const CelDb = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const MovDb = require("../models/Movie.model");


// ****************************************************************************************
// GET   ROUTE:/movies/create     RENDER : movies/new-movie  
//  Show a form to create a movie
// ****************************************************************************************

router.get("/create", (req,res,next) => {
    CelDb.find()
    .then(celebrities => {
        res.render("movies/new-movie", {celebrities})
    })
    .catch((e) => next(e)); 
})


// ****************************************************************************************
// POST   ROUTE:/movies/create     REDIRECT: /movies/movies.hbs    
//  submit the form and go to movies page
// ****************************************************************************************

router.post("/create", (req,res,next) => {
    const newMovie = req.body
    console.log("newMovie created: ", newMovie)
    
    MovDb.create(newMovie)
    .then(()=> res.redirect("/movies/movies"))
    .catch((e) => next(e)); 
})


// ****************************************************************************************
// GET   ROUTE:/movies/movies     RENDER : movies/movies  
// List all the movies
// ****************************************************************************************

router.get("/movies", (req, res,next) => {
    MovDb.find()
    .then((allmovies) => {
        res.render("movies/movies", {allmovies})
    })
    .catch((e) => next(e)); 
})


// ****************************************************************************************
// GET   ROUTE: "movie/:id"    RENDER :  movies/movie-details
//  Show  movie detail 
// ****************************************************************************************
router.get('/:id',(req, res,next)  => {
     const movieId = req.params.id
     MovDb.findById(movieId)
     .populate("cast")
     .then(movie => res.render('movies/movie-details', {movie}))
})


// ****************************************************************************************
// POST   ROUTE: /movies/:id/delete  REDIRECT : /movies/movies
//  Delete  movie 
// ****************************************************************************************

router.post("/:id/delete", (req,res,next)=> {
    const idMovie = req.params.id
    console.log(idMovie)
    MovDb.findByIdAndDelete(idMovie)
    .then(()=> res.redirect("/movies/movies"))
    .catch((e)=> next(e))
})


// ****************************************************************************************
// POST   ROUTE:/movies/:id/edit   REDIRECT : /movies/movies
//  show the form to edit  movie 
// ****************************************************************************************
router.post("/:id/edit", (req,res,next)=> {
    const movie = req.params.id
    MovDb.findById(movie)
    .then((xxx) => {
        console.log("asdasdadsada",xxx)
        CelDb.find()
        .then((cel)=> res.render("movies/edit-movie", {xxx,cel}))
    })
    .catch((e)=> next(e))
})


// ****************************************************************************************
// POST   ROUTE:/movies/:id   REDIRECT : /movies/:id
//  update  movie and go to the movie details page
// ****************************************************************************************

router.post("/:id", (req,res,next)=>{
    const modifiedMovie = req.params.id
    console.log(modifiedMovie,"hola",req.body)
    MovDb.findByIdAndUpdate(modifiedMovie, req.body)
    .then(()=> res.redirect(`/movies/${modifiedMovie}`))
    .catch((e)=> next(e))
})


module.exports = router;