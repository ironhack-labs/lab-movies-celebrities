// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const MovieModel = require("../models/Movies.model")
const CelebrityModel = require("../models/Celebrity.model")
// all your routes here

router.get("/movies/create", async (req, res)=>{
    const allCelebrities = await CelebrityModel.find()
    res.render("movies/new-movie", {allCelebrities})
})

router.post("/movies/create", async (req,res)=>{
    try{
        const {title, genre, plot, cast} = req.body
        await MovieModel.create({title, genre, plot, cast})
        res.redirect("/movies")
    }
    catch(e){
        console.log(e)
        res.redirect("/movies/create")
    }
})

router.get("/movies", async (req, res)=>{
    const allMovies = await MovieModel.find()
    res.render("movies/movies", {allMovies})
})

router.get("/movies/:movieId", async(req, res)=>{
    const movieDetail = await MovieModel.findById(req.params.movieId).populate("cast") // cast pq é o que vamos chamar no details
    console.log(movieDetail)
    res.render("movies/movie-details", {movieDetail})
})

router.post("/movies/:movieId/delete", async (req, res)=>{
    try{
        await MovieModel.findByIdAndDelete(req.params.movieId)
        res.redirect("/movies")
    }
    catch(e){
        res.redirect("/movies/:movieId")
    }
})

router.get("/movies/:movieId/edit", async (req, res)=>{
    const movieToEdit = await MovieModel.findById(req.params.movieId).populate("cast")
    const allCelebrities = await CelebrityModel.find().sort({name: 1})
    res.render("movies/edit-movie", {movieToEdit, allCelebrities})
})

router.post("/movies/:movieId/edit", async (req, res)=>{
    const {title, genre, plot, cast} = req.body
    await MovieModel.findByIdAndUpdate(req.params.movieId, {
        title,
        genre,
        plot,
        cast
    })
    res.redirect("/movies")
})

module.exports = router;