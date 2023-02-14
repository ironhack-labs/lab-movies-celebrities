const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/movies/create", async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find()
        res.render("movies/new-movie", {celebrities});
    } catch (error) {
        next(error)
    }
  
});
router.post('/movies/create', async (req, res, next) => {
  
    try {
      const { title, genre, plot, cast } = req.body;
     
      await Movie.create({ title, genre, plot, cast });
  
      res.redirect('/movies');
    } catch (error) {
      console.log(error);
      next(error);
      res.redirect('movies/new-movie')
    }
  });
  router.get('/movies', async (req, res, next) => {
   
    try {
      let movies = await Movie.find({});
      
      res.render('movies/movies', { movies });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });




module.exports = router;