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
module.exports = router;
