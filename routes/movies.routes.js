const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js")
const Movie = require("../models/Movie.model");
const movieControllers = require("../controllers/movies.controller");

router.get("/", movieControllers.list);

router.get("/create", movieControllers.create);

router.post("/create", movieControllers.doCreate);

router.get("/movies/:id", movieControllers.detail)

// all your routes here

module.exports = router;