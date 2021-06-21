const router = require("express").Router();

const celebrityController = require("./celebrities.routes");
const movieController = require("./movies.routes");

/* GET home page */

router.get("/", (req, res, next) => res.render("index.hbs"));

router.get("/celebrities", celebrityController.home);
router.get("/movies", movieController.home);

router.get("/celebrities/create", celebrityController.createCelebrity);
router.post("/celebrities/create", celebrityController.doCreateCelebrity);

router.get("/movies/create", movieController.createMovie);
router.post("/movies/create", movieController.doCreateMovie);

module.exports = router;
