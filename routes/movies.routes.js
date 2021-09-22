const router = require("express").Router();

const moviesController = require("../Controllers/moviesController");

router.get("/create", moviesController.newGetMovie);

router.post("/create", moviesController.newPostMovie);

router.get("/", moviesController.listMovies);

router.get("/:id", moviesController.detailsMovie);

router.post("/:id/delete", moviesController.deteleMovie);

router.get("/:id/edit", moviesController.editGetMovie);

router.post("/:id/edit", moviesController.editPostMovie);

// router.post("/:id", moviesController.detailsPostMovie);

module.exports = router;
