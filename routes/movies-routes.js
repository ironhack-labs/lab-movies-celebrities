const moviesRouter = require("express").Router();

const { find } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model')


moviesRouter.get("/movies", (req, res) => {
  // res.send("movies");
  Movie
    .find()
    .populate('cast', 'name')
    .then(movie => {
      // res.send(movie)
      res.render('movies/movies', {movie} )
    })
    .catch(err => {
      console.log(err)
    })

});


moviesRouter.get("/movies/create", (req, res) => {
    // res.send("conecto");
    
    Celebrity
    .find()
    .select({ name: 1 })
    .then(celebrity => {
      const cast = {celebrity}
      // res.send({ ...cast })
      res.render("movies/new-movie", cast)
    })
    .catch(err => {
      console.log(err)
    })
});


 moviesRouter.get("/movies/:movie_id", (req, res) => {
    // res.send("conecto");
  const {movie_id} = req.params
    
  // res.send('conected')
    Movie
      .findById(movie_id)
      .populate('cast')
      .then(movie => {
        // res.send(movie)
        res.render('movies/movie-details', movie)
      })
      .catch(err => {
        console.log(err)
      })
 });

moviesRouter.get("/movies/:movie_id/edit", (req, res) => {
  
   const {movie_id} = req.params

  Movie
    .findById(movie_id)
    .populate('cast', 'name')
    .then((movie) => {
      // console.log(movie.cast)
      Celebrity
        .find()
        .select({ name: 1 })
        .then(celebrity => {
          
          //   function selected (){
          //     celebrity.forEach(celebrity => {
          //       movie.cast.forEach(celeb => {
          //         // console.log(celeb.name)
          //         // console.log(celebrity.name)
          //         // console.log('--------')
          //         if (celeb.name === celebrity.name) {
                    
          //           console.log(celeb.name)
          //           console.log(celebrity.name)
          //           console.log('--------')
          //           document.querySelector('#option').setAttribute('selected')
                    
          //         }
          //       })
          //     })
          // }
          // addEventListener('load', selected())
          res.render("movies/edit-movie", { movie, celebrity })
          
          // const selected = movie.cast[0]._id
          // // res.send({movie, celebrity})
          // console.log( movie.cast[0]._id)
          // console.log({movie, celebrity})
        })
    })
    .catch(err => {
      console.log(err)
    })
});

moviesRouter.post("/movies/create", (req, res) => {
  
  const { title, genre, plot, cast } = req.body
      // res.send("req.body");
    Movie
    .create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies")      
    })
    .catch(err => {
      console.log(err)
  })
});


moviesRouter.post("/movies/:movie_id/edit", (req, res) => {
  
  const { title, genre, plot, cast } = req.body

  const {movie_id} = req.params
      // res.send("req.body");
    Movie
      .findByIdAndUpdate(movie_id, { title, genre, plot, cast })
      .populate ('cast')
      .then(() => {
        // res.send(movie)
        res.redirect("/movies")            
      })      
      .catch(err => {      
        console.log(err)
      })
});


moviesRouter.post("/movies/:movie_id/delete", (req, res) => {
  
   const {movie_id} = req.params

  Movie
    .findByIdAndDelete(movie_id)
    .then(() => {
      // res.send(movie)
      res.redirect('/movies')
    })
    .catch(err => {
      console.log(err)
    })
});

module.exports = moviesRouter;
