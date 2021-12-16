// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model")


// all your routes here

router.get("/movies/create", (req,res,next) =>{
    res.render("movies/new-movie")
})


router.post("/movies/create", async(req,res,render) =>{

    const {title, genre, plot, cast, ...rest} = req.body
    try{
        const celebrity = await User.create({title, genre, plot, cast, ...rest})
        res.redirect("routes/movie.routes.js")
    }catch(error){
        console.log("error", error)
        if(error instanceof mongoose.Error.ValidationError){
            res.render("celebrities/new-movie")
        }else{
            res.render("celebrities/movies")
        }
        
    }
})

router.get("/movies", (req,res,next)=>{
    Movie.find()
    .then(moviesfromDB => res.render('movies/movies', {movies: moviesfromDB}))
    .catch(error =>
        next(error))
})





module.exports = router;