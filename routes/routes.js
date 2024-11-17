const router = require("express").Router();


const {
  createCeleb,
  doCreateCeleb,
  detailCeleb,
  deleteCeleb,
  listCeleb,
  editCelebritie,
  doEditCelebritie


}  = require('../controllers/celebrities.controller');


const {
  createMovie,
  doCreateMovie,
  detailMovie,
  deleteMovie,
  listMovies,
  editMovie,
  doEditMovie
 


}  = require('../controllers/movies.controller');


//HOME
router.get("/", (req, res, next) => res.render("index"));

//Celebrities

router.get("/celebrities/newCelebrity", createCeleb)
router.get("/clebrities/listCelebrities",listCeleb)
router.post("/celebrities/create",doCreateCeleb)
router.get("/celebrities/:celebrityId", detailCeleb)
router.post("/celebrities/:celebrityId/delete", deleteCeleb)
router.get("/celebrities/:celebrityId/edit", editCelebritie);
router.post("/celebrities/:celebrityId/edit", doEditCelebritie);



//Movies

router.get("/movies/newMovie", createMovie)
router.get("/movies/listMovies",listMovies)
router.post("/movies/create",doCreateMovie)
router.get("/movies/:movieId", detailMovie)
router.post("/movies/:movieId/delete", deleteMovie)
router.get("/movies/:movieId/edit", editMovie);
router.post("/movies/:movieId/edit", doEditMovie);






module.exports = router;
