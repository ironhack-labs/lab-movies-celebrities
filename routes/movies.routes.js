const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js")
const Movie = require("../models/Movie.model");
const movieControllers = require("../controllers/movies.controller");

router.get("/", movieControllers.list);

router.get("/create", movieControllers.create);

router.post("/create", movieControllers.doCreate);

router.get("/:id", movieControllers.detail);

router.post("/:id/delete", movieControllers.delete);

router.get("/:id/edit", movieControllers.edit)

router.post("/:id/edit", movieControllers.doEdit)
// all your routes here

module.exports = router;