// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Movie =require("../models/Movies.model");
const Celebrity =require("../models/Celebrity.model")
router.get('/movies/create',(req,res)=>{
    Celebrity
    .find()
    .then(celebrity=>{
        res.render('movies/new-movie',{celebrity})
    })
    .catch(err=>console.log(err))
})

router.post('/movies/create',(req,res)=>{
    const {title, genre, plot, cast} =req.body
    Movie
    .create({title, genre, plot, cast})
    .then(movie=>res.redirect('/movies'))
    .catch(err=>console.log(err))
})
module.exports = router;