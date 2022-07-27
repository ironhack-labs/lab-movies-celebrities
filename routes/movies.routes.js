// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const moviesController = require("../controllers/movies.controller");

// all your routes here

router.get("/movies", moviesController.movies);

//create new
router.get("/movies/create", moviesController.createmovie);
router.post("/movies/create", moviesController.doCreate);

//edit
router.get("/movies/:id/edit", moviesController.editmovie);
router.post("/movies/:id/edit", moviesController.doEdit);

//delete
router.post("/movies/:id/delete", moviesController.delete);

module.exports = router;