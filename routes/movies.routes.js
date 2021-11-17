const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");



router.get("/movies", (req,res)=>{
    Movie.find()
    .then((movieList)=>{
        res.render("movies", {movieList})
    }) })
router.get("/movies/create",(req,res)=>{
    Celebrity.find()
    .then((celebsList)=> {
        res.render("movies/new-movie", {celebsList: celebsList})
    })

router.post("/movies/create",(req,res)=>{
    const { title, genre, plot, cast } = req.body;
    Movie
    .create({ title, genre, plot ,cast })
    .then((createdMovie) => {
            res.redirect("movies");
          })
    .catch( (err) => console.log(err));
})})

router.get("/movies/create",(req,res)=>{
    res.render("movies/new-movie");
})

router.get("/movies/:moviesID", (req,res)=>{

    Movie.findById(movieID)
    .populate("cast")
    .then((foundMovie)=>{
        res.render("movies/movie-details", {foundMovie})
    })
    .catch((err)=>{
        console.log(err)
    })
})


module.exports = router;
