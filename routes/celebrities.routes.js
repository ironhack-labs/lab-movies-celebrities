const router = require("express").Router();

const celebritiesController = require("../Controllers/celebritiesController");

router.get("/create", celebritiesController.newGetCelebrity);

router.post("/create", celebritiesController.newPostCelebrity);

router.get("/", celebritiesController.listCelebrities);

module.exports = router;
