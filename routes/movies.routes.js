// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");



// all your routes here
//create new movie
router.get("/new-movie", async(req, res, next)=>{
 try {
   const allCelebrities = await Celebrity.find();

   res.render("movies/new-movie", { allCelebrities});
   console.log(allCelebrities)
  } catch (error) {
   next(error);
 }
});

router.post("/new-movie", async (req, res, next)=>{
try {
  const { title, genre, plot, cast } = req.body;
  await Movie.create ({
    title, genre, plot, cast })
  res.redirect("/movies");
}catch(error){
  res.redirect("movies/new-movie")
  next(error);  
}
});

// display all movies
router.get("/", async (req, res, next) => {
  try {
    
    const allMovies = await Movie.find();
    //console.log(allMovies);
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

// movie details
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieDetails = await Movie.findById(id);
    const celebrityDetails = await Celebrity.find();
    console.log(celebrityDetails)
    //console.log(movieDetails)
    res.render("movies/movie-details", {movieDetails, celebrityDetails});
  } catch (error) {
    next(error);
  }
});

// edit movies (get/post)
router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const moviesCast = await Movie.findById(id);
    res.render("movies/edit-movie", { moviesCast });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", async (req, res, next)=>{
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(id,{title, genre, plot, cast},{new: true});
    res.redirect('/movies/:id');
   
  }  catch (error) {
      next(error);
      res.render('movies/movie-details');
  }
})

// delete movie
router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
    res.redirect("/movies/:id/delete");
  }
});

module.exports = router;
