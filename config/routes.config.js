const router = require("express").Router();
const miscController = require("../controllers/misc.controller");
const celController = require("../controllers/celebrities.controller");
const movieController = require("../controllers/movies.controller");

// MISC
router.get("/", miscController.home);

//CELEBRITIES
router.get("/celebrities", celController.list);

router.get("/celebrities/create", celController.create);
router.post("/celebrities/create", celController.doCreate);

router.get("/celebrities/:id", celController.details);

router.post("/celebrities/delete/:id", celController.delete);

router.get("/celebrities/edit/:id", celController.edit);
router.post("/celebrities/edit/:id", celController.doEdit);

//MOVIES
router.get("/movies", movieController.list);

router.get("/movies/create", movieController.create);
router.post("/movies/create", movieController.doCreate);

router.get("/movies/:id", movieController.details);

router.post("/movies/delete/:id", movieController.delete);

router.get("/movies/edit/:id", movieController.edit);
router.post("/movies/edit/:id", movieController.doEdit);

module.exports = router;
