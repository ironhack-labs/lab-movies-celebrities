const router = require("express").Router();
const moviesController = require('../controllers/movies.controller')

router.get("/", moviesController.list);
router.get("/create", moviesController.create);
router.post("/create", moviesController.doCreate);
router.get("/:id", moviesController.detail);

module.exports = router;