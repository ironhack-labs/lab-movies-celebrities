const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get('/movies/create', async (req, res, next) => {
  const getCelebrities = await Celebrity.find()
  res.render("movies/new-movie", {getCelebrities})});

router.post('/movies/create', async (req, res, next) => {
  try{
    const {title, genre, plot, cast} = req.body
        const createdMovie = await Movie.create({title, genre, plot, cast})
        res.redirect(`/`)      

} catch (error){
    console.log(error)
    next(error)
}
}); 

router.get("/movies", async (req, res, next) => {
  try {
      const movies = await Movie.find()
      res.render("movies/movies", {movies})
  } catch (error) {
      console.log(error)
      next (error)
  }
})

module.exports = router;