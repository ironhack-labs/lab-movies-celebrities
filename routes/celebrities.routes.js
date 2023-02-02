const router = require("express").Router();
const celebritiesController = require("../controllers/celebrities.controller")

router.get("/create", celebritiesController.create)
router.post("/create", celebritiesController.doCreate)

router.get("/", celebritiesController.list)

module.exports = router;