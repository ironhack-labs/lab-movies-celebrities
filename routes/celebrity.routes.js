const express = require("express");
const router = express.Router();

const Celebrity = require("../models/Celebrity.model.js");

const celebrityController = require("./controllers/celebrityController");

router.get("/", celebrityController.list);

router.get("/create", celebrityController.getCreateForm);
router.post("/create", celebrityController.postCreateForm);

// router.get("/celebrities/:id", celebrityController.detail);

// router.post("/celebrities", celebrityController.postCreateForm);

// router.get("/celebrities/:id/edit", celebrityController.getEditForm);
// router.post("/celebrities/:id", celebrityController.postEditForm);

module.exports = router;