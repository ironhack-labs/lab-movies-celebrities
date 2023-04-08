const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get("/create", async(req, res)=>{
    const allCelebrities = await CelebrityModel.find()
    res.render("movies/new-movie",{allCelebrities})
})
router.post("/create",async(req,res)=>{
    try{const newMovie = await MovieModel.create(req.body)
        console.log(newMovie) 
        res.redirect("/movies")
      }
    catch(err){console.log("There's an error", err)}
})

router.get("/", async(req, res)=>{
    try{
    const allMovies = await MovieModel.find()
    console.log(allMovies)
    res.render("movies/movies", {allMovies})
    }
    catch(err){
        console.log("there's an error",err)
    }

})

router.get("/:id", async(req, res)=>{
    try{
    const oneMovie = await MovieModel.findById(req.params.id).populate("cast")
    console.log(oneMovie)
    res.render("movies/movie-details", oneMovie)
    }
    catch(err){
        console.log("there's an error",err)
    }

})

router.post("/:id/delete",async(req,res)=>{
    try{const removedMovie = await MovieModel.findByIdAndDelete(req.params.id)
        console.log(removedMovie) 
        res.redirect("/movies")
      }
    catch(err){console.log("There's an error", err)}
})


router.post("/:id/edit", async(req, res)=>{
    try{
    const oneMovie = await MovieModel.findById(req.params.id).populate()
    const allCelebrities = await CelebrityModel.find()
    console.log("The movie info",oneMovie, "the cast info",allCelebrities)
    res.render("movies/edit-movie", {oneMovie, allCelebrities})
    }
    catch(err){
        console.log("there's an error",err)
    }

})

router.post("/:movieId/",async(req,res)=>{
    try{
        const updatedData = req.body
        const {movieId} = req.params
        let updatedMovie = await MovieModel.findByIdAndUpdate(movieId, updatedData,{new:true})
        console.log("here!!!!",updatedMovie) 
        res.redirect(`/movies/${movieId}`)
      }
    catch(err){console.log("There's an error", err)}
})


module.exports = router;
