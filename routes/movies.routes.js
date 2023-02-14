// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
/* 
const Movie = require("../models/Movies.model"); */

router.get('/movies/create', (req, res) => res.render('movies/new-movies'));


router.post('/movies/create', async (req, res, next) => {
  try {
  
    const { title, genre, plot, cast } = req.body;
  
    await Movie.create({ title, genre, plot, cast });

   
    res.redirect('/');
 
  } catch (error) {
    console.log(error);
    next(error);
  }
});


module.exports = router;