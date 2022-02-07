const express = require('express');
const router = express.Router();
const Movie= require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model');
const { render } = require('express/lib/response');


router.get("/list", (req, res, next) => {

    Movie
        .find()
        .then(movies => res.render("movies/movies",{movies}) )
        .catch(err => console.log(err))

       
})
router.get("/create",(req,res,next)=>{
    Celebrity
        .find()
        .then(cast => {
            res.render("movies/new-movie", { cast })
           
        })
        .catch(err => console.log(err))
        
})
router.post("/create",(req, res, next)=>{

    const { title, genre, plot, cast } = req.body
    console.log(cast)
    console.log(req.body)
    Movie 
        .create({ title, genre, plot, cast })
        .then(() => res.redirect("/movies/list"))
        .catch(err => console.log(err))
})

router.get("/:id",(req,res,next)=>{

    const {id} = req.params

    Movie
       .findById(id)
       .populate('cast')
       .then(movie=>res.render("movies/movie-details",{movie}))
       .catch(err => console.log(err))
       
   
    //  res.send('peli detallada')
})

router.post("/:id/delete",(req,res,next)=>{
    const {id} = req.params
    Movie
      .findByIdAndDelete(id)
      .then(() => res.redirect("/movies/list"))
      .catch(err => console.log(err))
    // res.send(id)
})

router.get("/:id/edit",(req,res,next)=>{
    const { id } = req.params
    console.log(id)
  
    Movie
       .findById(id)  
       .then(movie => {
            Celebrity
                .find()
                .then(cast => res.render('movies/movie-edit', { movie, cast }))
                .catch(err => console.log(err))
        })
  
})
router.post("/:id/edit", (req, res, next)=>{
    const { id } = req.params
    const { title, genre, plot, cast } = req.body
    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast },{new:true})
        .then(() => res.redirect("/movies/list"))
        .catch(err => console.log(err))

})


module.exports = router;