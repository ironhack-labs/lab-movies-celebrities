const router = require("express").Router();
const moviesController = require('../controllers/movies.controller')

router.get("/", moviesController.list);
router.get("/create", moviesController.create);
router.post("/create", moviesController.doCreate);
router.get("/:id", moviesController.detail);
router.post("/:id/delete", moviesController.doDelete);
router.get("/:id/edit", moviesController.edit);
router.post("/:id/edit", moviesController.doEdit);

module.exports = router;