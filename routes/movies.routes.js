const router = require("express").Router();
const Movie = require("../models/Movie.model");

router.get('/movies',(req,res,next)=>{
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
  
  /* router.post('/movies/:_id', (req, res, next) => {
    const {_id} = req.params
    const {name,propellers,maxSpeed} = req.body
    Drone.findByIdAndUpdate(_id,{name,propellers,maxSpeed},{new:true}) 
      .then(updatedDrone=>{
          console.log("el nuevo Dron",updatedDrone)
          res.redirect("/drones")
      })
      .catch(error=>{
          console.log("el error",error)
          next()
      })
  }); */

module.exports = router;