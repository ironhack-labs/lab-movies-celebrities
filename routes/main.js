const router = require("express").Router();
const celebritiesController = require ("../controllers/celebrities.controller")
const moviesController = require ("../controllers/movies.controller")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//Celebrities routes

router.get("/celebrities", celebritiesController.list)
router.get("/celebrities/create", celebritiesController.create)
router.post("/celebrities/create", celebritiesController.doCreate)

//Movies routes
router.get("/movies", moviesController.list)
router.get("/movies/create", moviesController.create)
router.post("/movies/create", moviesController.doCreate)
router.get("/movies/:id", moviesController.detail)
router.post("/movies/:id/delete", moviesController.delete)
router.get("/movies/:id/edit", moviesController.edit)
router.post("/movies/:id/edit", moviesController.doEdit)


module.exports = router;
