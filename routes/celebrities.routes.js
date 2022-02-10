// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express")
const router = express.Router()

const celebrityController = require("./../controllers/celebrityController")

router.get("/", celebrityController.getCelebrities);

router.get("/create", celebrityController.createCelebrity);

router.post("/create", celebrityController.createCelebrityForm);

// all your routes here

module.exports = router;