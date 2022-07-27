const router = require("express").Router();
const celebritiesController = require ('../controllers/celebrities.controller')
const moviesController = require ("../controllers/movies.controller")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//CELEBRITIES
router.get("/celebrities", celebritiesController.list)

router.get("/celebrities/create", celebritiesController.create)
router.post("/celebrities", celebritiesController.doCreate);

router.get("/celebrities/:id", celebritiesController.details)

router.post("/celebrities/:id/delete", celebritiesController.delete)




//MOVIES
router.get("/movies", moviesController.list)

router.get("/movies/create", moviesController.create)
router.post("/movies", moviesController.doCreate)

router.get("/movies/:id", moviesController.details)

router.post("/movies/:id/delete", moviesController.delete)

router.get("/movies/edit/:id", moviesController.edit);
router.post("/movies/edit/:id", moviesController.doEdit);


module.exports = router;
