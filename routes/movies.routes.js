// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movies = require("../models/Movie.model.js")
const Celebrities = require("../models/Celebrity.model.js")

// all your routes here
router.get("/movies/create",(req,res,next)=>{
    Celebrities.find()
    .then((celebrity) =>{
        res.render("movies/new-movie", {celebrity})
    })
    .catch(err => console.log(err))
})

router.post("/movies/create",(req,res,next)=>{
    const {title, genre, plot, cast} = req.body
    Movies.create({title, genre, plot, cast})
    .then(()=>res.redirect("/movies"))
    .catch(()=>res.redirect("/movies/create"))
})

router.get("/movies",(req,res,next)=>{
    Movies.find()
    .then(elem => res.render("movies/movies", {elem}))
    .catch(err => console.log("Error finding movies: ", err))
    })

router.get("/movies/:id",(req,res,next)=>{
    const {id}=req.params
    Movies.findById(id)
    .populate("cast")
    .then((movieDetails => {
        res.render("movies/movie-details",movieDetails)
    }))
    .catch()
})

router.post("/movies/:id/delete", (req,res,next)=>{
    const {id}=req.params
    Movies.findByIdAndDelete(id)
    .then(()=>res.redirect("/movies"))
    .catch(err => console.log("Error deleting movie: ", err))
})

router.get("/movies/:id/edit",(req,res,next)=>{
    const {id}=req.params
   Movies.findById(id)
   .populate("cast")
   .then((movieDetails => {
       Celebrities.find()
       .then((celebs)=>{
        console.log(celebs)
           res.render("movies/edit-movie",{movieDetails, celebs})
           //res.render("movies/edit-movie",movieDetails)
       })
       .catch(err => console.log("Error finding: ", err))
}))
   .catch()
})

router.post("/movies/:id/edit", (req,res,next)=>{
    const {title, genre, plot, cast} = req.body
    const {id}=req.params
    Movies.findByIdAndUpdate(id, {title, genre, plot, cast} , { new: true })
    .then(()=>res.redirect("/movies/"+id))
    .catch(err => console.log("Error updating: ", err))
})

module.exports = router;