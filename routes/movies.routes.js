// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { restart } = require("nodemon");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model")

// all your routes here

router.get("/movies/create", async (req, res, next)=> { 
    try {
        const celebrities = await Celebrity.find()
        res.render("movies/new-movie.hbs", {celebrities})
    } catch (error) {
        console.log(error)
        next(error)
        
    }
})

router.post("/movies/create", async (req, res, next)=> {
    try {
        const {title, genre, plot, cast} = req.body;
        await Movie.create({title, genre, plot, cast})
        res.redirect("/movies")
    } catch (error) {
        console.log(error)
        next(error)
        
    }
})

// Getting all movies 

router.get("/movies", async (req, res, next)=> {
    try {
        let movies = await Movie.find();
        res.render("movies/movies", {movies})
    } catch (error) {
        console.log(error)
    next(error)        
    }
})

// ID routes
router.get('/movies/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const movies = await Movie.findById(id)
        .populate('cast')
      console.log(movies);
    
      res.render('movies/movie-details', movies);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  
  router.post("/movies/:id/delete", async (req, res, next) => {
    try {
      const { id } = req.params;
      await Movie.findByIdAndDelete(id);
      res.redirect("/movies");
    } catch (error) {
      console.log(error);
      next(error);
    
    }
  });

  router.get("/movies/:id/edit", async (req, res, next) => {
    try {
      const { id } = req.params;
      const movies = await Movie.findById(id);
      const celebrity = await Celebrity.findById(id)
      res.render("movies/edit-movie", { movies, celebrity});
    } catch (error) {
      console.log(error);
      next(error)
      res.redirect("/movie-details")
    }
  });
  
  router.post("/movies/:id/edit", async (req, res, next) => {
    try {
      const { id } = req.params;
      const {title, genre, plot, cast } = req.body;
      const {name, occupation, catchPhrase } = req.body;
      await Movie.findByIdAndUpdate(id, { title, genre, plot, cast });
      res.redirect(`/movies/${id}`);
    } catch (error) {
      console.log(error);
      next(error);
      res.redirect("movie-details")
    }
  });


module.exports = router;