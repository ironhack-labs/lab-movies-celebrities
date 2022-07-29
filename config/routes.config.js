const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const celebritiesController = require("../controllers/celebrities.controller");
const movieController = require("../controllers/movies.controller");


router.get("/", miscController.home);

// Celebrities

//show the celebrities
router.get("/celebrities", celebritiesController.celebrities);

//create new
router.get("/celebrities/create", celebritiesController.createCelebrity);
router.post("/celebrities/create", celebritiesController.doCreate);

//edit
router.get("/celebrities/:id/edit", celebritiesController.editCelebrity);
router.post("/celebrities/:id/edit", celebritiesController.doEdit);

//delete
router.post("/celebrities/:id/delete", celebritiesController.delete);

//-------------------------------------------------------------------------

// Movies

//show the movies
router.get("/movies", movieController.Movie);

//create new movies
 router.get("/movies/create", movieController.create);
 router.post("/movies/create", movieController.doCreate);

 //get details of movie
 router.get("/movies/:id",movieController.details);

 //delete a movie
router.post("/movies/:id/delete", movieController.delete);

//edit a movie
//router.get("/movies/:id/edit", movieController.edit);
//router.post("/movies/:id/edit", movieController.doEdit);

module.exports = router; 