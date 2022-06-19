const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require('../models/Celebrity.model');

router.get('/user/movies',(req,res,next)=>{
    Movie.find()
    .then((movies)=>{
        res.render('movies/movies',{movies});
    })
    .catch(error=>{
        console.log("Error",error)
        next()
    })
})

router.get('/movies/create',(req,res,next)=>{
  res.render('movies/new-movie')
})

router.post("/movies/create",(req,res,next)=>{
    Movie.create(req.body)
    .then(movies => {
        console.log("que es el dog",movies)
        res.render("success",movies)
    })
    .catch(error=> {
        console.log("error",error)
        next()
    })
})

router.get('/movies/:_id', (req, res, next) => {
    const {_id} = req.params
    Movie.findById(_id)
    .then(movie => {
      res.render('movies/movie-details',movie)
    })
    .catch(error => {
      console.log('Error',error)
      next(error);
    })
  });

  router.post('/movies/:id/delete', (req, res, next) => {
    // Iteration #5: Delete the drone
    // ... your code here
    const { id } = req.params
      Movie.findByIdAndDelete(id)
      .then(()=>{
        /* res.render("drones/success",{isDelete:true}) */
        res.redirect('/movies')
      })
      .catch(error=>{
          console.log("error",error)
          next()
      })
  });
  

  router.get('/movies/edit-movie/:_id',(req,res,next)=>{
  const {_id} = req.params
  Movie.findById(_id)
  .then(movieE => { 
    Celebrity.find()
    .then(celebrities => res.render('movies/edit-movie', {movieE , celebrities}) )
    .catch(error => {
      console.log('Error',error)
      next(error);
    })
  })
  })

  router.post('/movies/edit-movie/:_id', (req, res, next) => {
    const {_id} = req.params
    const {title,genre,plot,cast} = req.body
    Movie.findByIdAndUpdate(_id,{title,genre,plot,cast},{new:true}) 
      .then(updatedMovie=>{
          console.log("el nuevo mov",updatedMovie)
          res.redirect("/movies")
      })
      .catch(error=>{
          console.log("el error",error)
          next()
      })
  });

module.exports = router;