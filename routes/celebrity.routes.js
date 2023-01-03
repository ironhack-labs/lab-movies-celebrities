const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model.js");
const celebrityController = require("./controllers/celebrityController");

router.get("/", celebrityController.list);
router.get("/create", celebrityController.getCreateForm);
router.post("/create", celebrityController.postCreateForm);

router.get("/:id", celebrityController.detail);
router.get("/:id/edit", celebrityController.getEditForm);
router.post("/:id", celebrityController.postEditForm);

module.exports = router;