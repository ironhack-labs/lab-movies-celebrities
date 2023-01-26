const router = require("express").Router();
const moviesController = require("../controllers/movies.controller");

router.get("/create", moviesController.newMovie);
router.post("/create", moviesController.create);
router.get("/", moviesController.find);
router.get("/:movieId/detail", moviesController.detail);
router.post("/:movieId/delete", moviesController.delete);
router.get("/:movieId/edit", moviesController.edit);
router.post("/:movieId/edit", moviesController.doEdit);

module.exports = router;
