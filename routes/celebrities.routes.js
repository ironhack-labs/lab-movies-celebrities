const router = require("express").Router();
const celebritiesController = require('../controllers/celebrities.controller')

router.get("/", celebritiesController.find);
router.get("/create", celebritiesController.newCelebrity);
router.post("/create", celebritiesController.create);
router.get("/:id/detail", celebritiesController.detail)
router.post("/:id/delete", celebritiesController.delete)


module.exports = router;

