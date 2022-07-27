const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const celebritiesController = require("../controllers/celebrities.controller");
const movieController = require("../controllers/movies.controller");


router.get("/", miscController.home);

// Celebrities
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

// // Movies
// router.get("/movies", movieController.Movie);

// //create new
// router.get("/movies/create", movieController.createMovie);
// router.post("/movies/create", movieController.doCreate);

// //edit
// router.get("/movies/:id/edit", movieController.editMovie);
// router.post("/movies/:id/edit", movieController.doEdit);

// //delete
// router.post("/movies/:id/delete",movieController.delete);

module.exports = router;