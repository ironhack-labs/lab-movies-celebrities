const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const celebrityControllers = require("../controllers/celebrities.controller");

router.get("/", celebrityControllers.list)

router.get("/create", celebrityControllers.create);

router.post("/create", celebrityControllers.doCreate);

module.exports = router;