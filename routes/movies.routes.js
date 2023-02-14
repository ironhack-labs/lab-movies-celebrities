// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movies = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get("/movies/create", async (req, res, next) => {
  try {
    let allCelebs = await Celebrity.find();
    res.render("movies/new-movie", { allCelebs });
  } catch (error) {}
});

router.post("/movies/create", async (req, res, next) => {
  try {
    let movies = await Movies.create(req.body);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies", async (req, res, next) => {
  try {
    let allMovies = await Movies.find();
    res.render("movies/movies", { allMovies });
  } catch (error) {
    console.log(error);
  }
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    let specificMovie = await Movies.findById(req.params.id)
      .populate("cast")
      /* .populate({
        path: "cast",
        populate: {
          path: "name",
          model: "Celebrity",
        },
      } ) */
    
    res.render('movies/movie-details', specificMovie)
  } catch (error) {
    console.log(error);
  }
});

router.post('/movies/:id/delete', async (req, res, next) =>{
    try {
        await Movies.findByIdAndRemove(req.params.id)
        res.redirect('/movies');
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/movies/:id/edit', async (req,res,next) =>{
    try {
        let specificMovie = await Movies.findById(req.params.id);
        let allCelebs = await Celebrity.find()
        res.render('movies/edit-movie', {specificMovie, allCelebs})
    } catch (error) {
        
    }
})

router.post('/movies/:id/edit', async (req, res, next) => {

    try {
        let {title, genre, plot, cast} = req.body
        await Movies.findByIdAndUpdate(req.params.id, {title, genre, plot, cast})
        res.redirect('/movies');
    } catch (error) {
        console.log(error)
        next(error)
    }
})
module.exports = router;
