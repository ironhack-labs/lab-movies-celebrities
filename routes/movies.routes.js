// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model.js");
// all your routes here

//GET /movies/create form to create celebrity
router.get("/create", async (req, res, next) => {
  try {
    let celebritiesList = await Celebrity.find();
    res.render("movies/new-movie.hbs", {
      celebritiesList,
    });
  } catch (error) {
    next(error);
  }
});

//POST /movies/create data from form to create celeb and save it in DB

router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  if (!title || !genre || !plot || !cast) {
    res.render("movies/new-movie");
  }

  try {
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// GET /movies > show all movies
router.get("/", async (req, res, next) =>{
try {
  const moviesList = await Movie.find()
   res.render('movies/movies.hbs', {moviesList});

  } catch (error) {
  next(error)
}
});

//GET /movies/:id Show specific movie
router.get("/:moviesId", async (req, res, next) => {
 
  const {moviesId} = req.params;
  try { 
  const movieDetails = await Movie.findById(moviesId).populate("cast")
  
  console.log(movieDetails)
  res.render("movies/movie-details.hbs", {movieDetails})
} catch (error) {
  next(error)
}

})

// DELETE 
// POST /movies/:id/delete -- Delete a specific movie
router.post("/:movieId/delete", async (req, res, next) => {

  const {movieId} = req.params

  try {
    await Movie.findByIdAndDelete(movieId)

    res.redirect("/movies")
  } catch(error) {
    next(error)
  }
})



module.exports = router;
