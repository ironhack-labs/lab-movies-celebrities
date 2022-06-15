const router =require("express").Router()
const Movie = require ("../models/Movies.models")

router.get("/movies",(req,res,next)=>{

    Movie.find()
    .then(movies=>{
        res.render("movies/movies",{movies})
    })


})
router.get("/movies/create",(req,res,next)=>{

    res.render("movies/new-movie")
})

router.post("/movies/create",(req,res,next)=>{

Movie.create(req.body)
.then(movie=>{

    res.redirect("/movie/movies",{movie})
})
.catch(error=>{
    console.log("Dime cual es mi error",error)
})

})
//detalles de peliculas

router.get("/movies/:id",(req,res,next)=>{
    const {id}= req.params

    Movie.findById(id)
    .then(movie=>{
        res.render("movies/movie-details",movie)
})
.catch(error =>{
    console.log("El error",error)
    next()
  })
})

router.post("/movies/:id",(req,res,next)=>{
    
})







module.exports = router