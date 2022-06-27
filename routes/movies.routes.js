// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router()
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")
// all your routes here


//CREATE

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            console.log("Lista de personas: ", celebrities);
            res.render("movies/new-movie", {celebrities});
        })
        .catch(err => {
            console.log("Error in create a new movie: ", err);
            next();
        })
})

router.post("/movies/create", (req, res, next) => {
    
    const {...movieInfo} = req.body;
    Movie.create(movieInfo)
        .then(movie => res.redirect("/movies"))
        .catch(err => {
            console.log("Error creating movie", err);
            next();
        })
})

//READ

router.get("/movies", (req, res, next) => {
    Movie.find()
        .then(movies => {
            // console.log("Lista de peliculas: ", movies);
            res.render("movies/movies", {movies});
        })
        .catch(err => {
            console.log("Error to show the list movie's list ", err);
            next();
        })
})

router.get("/movies/:id", (req, res, next) => {
    const {id} = req.params;
    Movie.findById(id)
        .populate("cast")
        .then(movie => {
            // console.log("Movie's details: ", movie);
            res.render("movies/movies-details", {movie});
        })
        .catch(err => {
            console.log("Error tho show movie's details ", err);
            next();
        })
})
    
// UPDATE
//update
router.get('/movies/:id/edit',(req, res, next) =>{
    const {id} = req.params
    Movie.findById(id)
      .then(movieData => {Celebrity.find()
          .then(celebData => res.render('movies/edit-movie', {movieData, celebData}))
          .catch(error => {
            console.log('Error while editing',error)
            next()
          })
      })
  })
  //update
  router.post('/movies/:id/edit',(req, res, next) => {
    const {id} = req.params
    const {name, genre, plot, cast} = req.body
    Movie.findByIdAndUpdate(id, {name, genre, plot, cast})
      .then(() => {
        res.redirect(`/movies/${id}`)
      })
      .catch(error => {console.log(error)})
  })
    
//DELETE


    module.exports = router;