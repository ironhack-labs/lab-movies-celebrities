const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
    .then(celebs => res.render("movies/new-movie", {celebs}))
    .catch((err) => console.log(err))
  });

    router.post('/movies/create', (req, res, next) => {
    const {title, genre, plot, cast} = req.body
    Movie.create({title, genre, plot, cast})
     .then(movie => {
        res.redirect('/movies',{movie})
     })
     .catch(err => res.redirect('/movies/create'))
   })

   router.get('/movies', (req, res) => {
       Movie.find()
       .then(movies => {
        console.log(movies)
        res.render('movies/movies', {movies})
       })
       .catch(err => console.log(err))
   })
   
   router.get("/movies/:id", (req, res, next) => {
    Movie.findById(req.params.id)
    .populate("cast")
      .then(movie => {
        res.render("movies/movie-details", { movie });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  });
  

  router.get("/movies/:id/edit", (req, res, next) => {
    Movie.findById(req.params.id)
      .then(movie => {
        Celebrity.find()
        .then(cast => {
          res.render("movies/edit-movie", { movie, cast });
        });
      }).catch(err => console.log(err))
  });
  
  router.post("/movies/:id/edit", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(req.params.id,{ title, genre, plot, cast })
      .then(() =>{
         res.redirect('/movies') 
      }).catch((error) => next(error));
  });
  
  router.post("/movies/:id/delete", (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
      .then(() => res.redirect("/movies"))
      .catch((err) => console.log(err));
  });

module.exports = router;