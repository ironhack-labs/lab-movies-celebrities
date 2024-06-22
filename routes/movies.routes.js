// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model")
const movieModel = require("../models/Movies.model")

// all your routes here

router.get('/movies/create', async (req, res) => {
    const allCelebrities = await CelebrityModel.find()
    console.log("all the celebrities", allCelebrities)
    res.render("movies/new-movie", { allCelebrities })
})
router.get('/movies', async (req, res) => {
    const movieList = await movieModel.find().populate('cast')
    res.render('movies/movies', { movieList })
})
router.get('/movies/:id', async (req, res) => {
    const movieId = await req.params.id
    const movieDetails = await movieModel.findById(movieId).populate('cast')
    res.render('movies/movie-details', { movieDetails })
})
router.get('/movies/:id/edit', async (req, res) => {
    const movieEdit = await movieModel.findById(req.params.id)
    const celebrities = await CelebrityModel.find()
    res.render("movies/edit-movie", {movieEdit, celebrities})
})
router.post('/movies/create', async (req, res) => {
        const newMovie = await movieModel.create(req.body)
        res.redirect('/movies')
        console.log("new movie created", newMovie)
})
router.post("/movies/:id/delete", async (req, res) => {
    try {
      const movieId = req.params.id
      const deleteMovie = await movieModel.findByIdAndDelete(movieId);
      console.log("Movie deleted:", deleteMovie);
      res.redirect("/movies");
    } 
    catch (error) {
      console.log(error);
    }
  });
  router.post("/movies/:id", async (req, res) => {
    try {
        const movieId = req.params.id
        const updateMovies = await movieModel.findByIdAndUpdate(movieId, req.body)
        res.redirect("/movies");
    } catch (error) {
        res.redirect('/movie-details')
        console.log(error);
    }
    
  })

module.exports = router;