const router = require("express").Router();

const {
  createCelebrity,
  exportCelebrity,
  showCelebrities,
  
} = require("./celebrities.routes");

const { 
  createMovie,
   exportMovie,
   showMovies,
   showMovieDetails,
   deleteMovie,
   editMovie,
   doEditMovie
   } = require("./movies.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/celebrities/create", createCelebrity);
router.post("/celebrities/create", exportCelebrity);
router.get("/celebrities", showCelebrities);

router.get("/movies",showMovies);
router.get("/movies/create", createMovie);
router.get("/movies/:id", showMovieDetails)
router.post("/movies/create", exportMovie);
router.post("/movies/delete/:id",deleteMovie);
router.get("/movies/:id/edit", editMovie);
router.post("/movies/:id/edit", doEditMovie);

module.exports = router;
