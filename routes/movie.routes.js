const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");
const movieController = require("./controllers/movieController");

router.get("/", movieController.list);

router.get("/create", movieController.getCreateForm);
router.post("/create", movieController.postCreateForm);

router.get("/:id", movieController.detail);
router.get("/:id/edit", movieController.getEditForm);
router.post("/:id/edit", movieController.postEditForm);
router.post("/:id/delete", movieController.delete);

module.exports = router;
