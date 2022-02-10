const express = require('express');
const router = express.Router();
const celeController = require("../controllers/celeController")


router.get("/create", celeController.createCele)
router.post("/create", celeController.createCeleForm)

router.get("/", celeController.getCelebrities)



module.exports = router