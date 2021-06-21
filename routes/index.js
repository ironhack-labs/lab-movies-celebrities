const router = require("express").Router();

const celebrityController = require("./celebrities.routes");
const movieController = require("./movies.routes");

/* GET home page */

router.get("/", (req, res, next) => res.render("index.hbs"));

router.get("/celebrities", celebrityController.home);
router.get("/movies", movieController.home);

router.get("/celebrities/create", celebrityController.createCelebrity);
router.post("/celebrities/create", celebrityController.doCreateCelebrity);

router.get("/celebrities/:id/edit", celebrityController.editCelebrity);
router.post("/celebrities/:id/edit", celebrityController.doEditCelebrity);

router.post("/celebrities/:id/delete", celebrityController.deleteCelebrity);

router.get("/celebrities/:id", celebrityController.idCelebrity);

router.get("/movies/create", movieController.createMovie);
router.post("/movies/create", movieController.doCreateMovie);

router.get("/movies/:id/edit", movieController.editMovie);
router.post("/movies/:id/edit", movieController.doEditMovie);

router.post("/movies/:id/delete", movieController.deleteMovie);

router.get("/movies/:id", movieController.idMovie);

module.exports = router;
