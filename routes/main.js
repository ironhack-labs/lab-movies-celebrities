const router = require("express").Router();
const celebritiesController = require("../controllers/celebrities.controller");
const moviesController = require("../controllers/movies.controller");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("home");
});


//Celebrities

router.get("/celebrities", celebritiesController.list);
router.get("/celebrities/create", celebritiesController.create);
router.get("/celebrities/:id", celebritiesController.detail);
router.post("/celebrities", celebritiesController.doCreate);
router.get("/celebrities/:id/edit", celebritiesController.edit);
router.post("/celebrities/:id", celebritiesController.doEdit);
router.post("/celebrities/:id/delete", celebritiesController.delete);



//Movies
router.get("/movies", moviesController.list);
router.get("/movies/create", moviesController.create);
router.get("/movies/:id", moviesController.detail);
router.post("/movies", moviesController.doCreate);
router.get("/movies/:id/edit", moviesController.edit);
router.post("/movies/:id", moviesController.doEdit);
router.post("/movies/:id/delete", moviesController.delete);



module.exports = router;
