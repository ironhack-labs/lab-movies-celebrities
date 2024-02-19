const router = require("express").Router();
const celebritiesController = require("../controllers/celebrities.controllers");
const moviesController = require("../controllers/movies.controller");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//Celebrities Routes
//GET:
router.get("/celebrities", celebritiesController.list);
router.get("/celebrities/new-celebrity", celebritiesController.create);
router.get("/celebrities/:id", celebritiesController.detail);
router.get("/celebrities/:id/edit", celebritiesController.edit);
//POST:
router.post("/celebrities", celebritiesController.doCreate);
router.post("/celebrities/:id", celebritiesController.doEdit);
router.post("/celebrities/:id/delete", celebritiesController.delete);
//Movies Routes
//GET: 
router.get("/movies", moviesController.list);
router.get("/movies/create", moviesController.create);
router.get("/movies/:id", moviesController.detail);
router.get("/movies/:id/edit", moviesController.edit);
//POST:
router.post("/movies", moviesController.doCreate);
router.post("/movies/:id", moviesController.doEdit);
router.post("/movies/:id/delete", moviesController.delete);


module.exports = router;
