const CelebModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

const router = require("express").Router();

// all your routes here
router.get("/movieslist", async (req, res) => {
  try {
    const allMovies = await MovieModel.find();
    res.render("movies/movies", { allMovies });

  } catch (err) {
    console.log("movie list page error", err);
  }

});

router.get("/create", async (req, res) => {
  const allCelebs = await CelebModel.find();
  res.render("movies/new-movie", { allCelebs });
});

router.post("/create", async (req, res) => {
  try {
    const newMovieCreated = await MovieModel.create(req.body);
    console.log("NEW MOVIE", newMovieCreated)
    res.redirect("/movies/movieslist");
  } catch (err) {
    res.redirect("/movies/create");
    console.log("movie post error", err);
  }
});

router.get("/:id", async (req, res) => {

    const { movieID } = req.params;
    const currentMovie = await MovieModel.findById(movieID).populate("cast");
    console.log("movie from ID page", currentMovie); 
    res.render("movies/movie-details", { currentMovie });
  }); 
  

router.post("/:id/delete", async (req, res) => {
  try {

    const { movieID } = req.params;
    await MovieModel.findByIdAndDelete(movieID);
    res.redirect("/movies/movieslist");
  
  } catch (err) {
    console.log("movie post error", err);
    res.send ("Oops, problem while deleting, try again.");
  }
});

router.get("/:id/edit", async(req,res) => {

  const { movieID } = req.params;
  const movieToEdit = await MovieModel.findById(movieID).populate("cast");
  const allCelebs = await CelebModel.find();

  res.render("movies/edit-movie", { movieToEdit, allCelebs} );
});

router.post("/:id", async(req,res) => {
  const { movieID } = req.params;
  const updatedMovie = await MovieModel.findByIdAndUpdate( { _id: movieID }, req.body);
  res.redirect(`/movies/${movieID}`);
});

//   router.get("/celebs", async (req,res) => {
//       try {
//           const allCelebs = await CelebModel.find();
//           res.render("celebs/celebs", {allCelebs});

//       } catch {
//           res.send ("Oops, an error, go back");
//       }

//   })

module.exports = router;
