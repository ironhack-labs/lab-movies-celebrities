// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity");
const Movie = require("../models/Movie");

router.get("/movies/create",async (req, res, next) => {
    let celebrities =await Celebrity.find();
    res.render("movies/new-movie", { celebrities });
  
});
router.post("/movies/create", async (req, res, next) => {
  try {
    const { title, genre, plot,cast } = req.body;
    await Movie.create({ title, genre, plot,cast });
    res.riderect("/movies");
  } catch (error) {
    res.render("movies/new-movie");
  }
});
router.get("/movies", async (req, res, next) => {
  try {
    let movies = Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    next(error);
  }
});




router.get('/movies/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    
    const movie = await Movie.findById(id)
      .populate('cast')
    
    res.render('movies/movie-details',movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


// all your routes here

module.exports = router;