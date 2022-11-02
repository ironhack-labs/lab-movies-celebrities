const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");


router.get("/movies/create", async (req,res,next) =>{
    

try{
    let celebrities = await Celebrity.find();
    res.render("movies/new-movie", {celebrities})
} catch(error){
    console.log(error)
    next(error);
}})


router.post("/movies/create", async (req,res,next) =>{

    try {
        const {title, genre, plot, cast} = req.body

        let createdMovie = await Movie.create({title, genre,plot, cast})

        res.redirect(`/movies`)
        
    } catch (error) {
        res.redirect(`/movies/create`)
        console.log(error)
        next(error)
    }
})

module.exports = router;