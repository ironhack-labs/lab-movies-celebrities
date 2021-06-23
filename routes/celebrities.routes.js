const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const celebrityControllers = require("../controllers/celebrities.controller");

router.get("/", celebrityControllers.list)

router.get("/create", celebrityControllers.create);

router.post("/create", celebrityControllers.doCreate);

router.get("/:id", celebrityControllers.detail);

router.post("/:id/delete", celebrityControllers.delete);

router.get("/:id/edit", celebrityControllers.edit)

router.post("/:id/edit", celebrityControllers.doEdit)

module.exports = router;