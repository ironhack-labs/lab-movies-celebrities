// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model")


router.get('/movies', async (req, res) => {
    const allMovies = await Movie.find().populate("cast");
     res.render("movies/movies", {allMovies});
 })


router.get("/create-movie", async (req, res) => {
const allCelebrities = await Celebrity.find().sort({ name: 1 }); 
  res.render("movies/new-movie", {allCelebrities});
});

router.post("/create-movie", async (req, res) => {
    const { title, genre, plot, cast, } = req.body;
    await Movie.create({
        title,
        genre,
        plot,
        cast,
    });
    res.redirect("/movies");
    });
    
     
     router.get("/movies/:id", async (req, res) => {
         const movieDetail = await Movie.findById(req.params.id).populate("cast");
         res.render("movies/movie-details", {movieDetail});
     });
     
     router.post("/movies/:id/delete", async (req, res) => {
         await Movie.findByIdAndRemove(req.params.id);
         res.redirect("/movies");
     });
         
router.get("/movies/:movieId/edit", async (req, res)=>{
    const movieToEdit = await Movie.findById(req.params.movieId).populate("cast")
    const allCelebrities = await Celebrity.find().sort({name: 1})
    res.render("movies/edit-movie", {movieToEdit, allCelebrities})
});

router.post("/movies/:movieId/edit", async (req, res)=>{
    const {title, genre, plot, cast} = req.body
    await Movie.findByIdAndUpdate(req.params.movieId, {
        title,
        genre,
        plot,
        cast
    });
    res.redirect("/movies")
});
   
module.exports = router