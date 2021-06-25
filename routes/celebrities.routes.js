const router = require("express").Router();
const celebritiesControllers = require("../controllers/celebrities.controllers");

const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model");

// all your routes here
router.get("/", celebritiesControllers.viewCelebrities)

router.get("/create", celebritiesControllers.addCelebrity);
router.post("/create", celebritiesControllers.doAddCelebrity);


module.exports = router;