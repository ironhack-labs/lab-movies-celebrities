const router = require("express").Router();
const Movie = require("../models/Movie.model")

router.get("/movies",(req,res)=>{
    Movie.find().then((movies)=>{res.render("movies/list",{movies})}).catch((err)=>console.log(err))
 
})

router.get("/movies/create",(req,res)=>res.render("movies/create"))

router.post("/movies/create",(req,res)=>{
    const {title,genre,plot,cast}= req.body
    Movie.create({title,genre,plot,cast}).then(()=>res.redirect("/movies")).catch((err)=>console.log(err))

})

module.exports = router