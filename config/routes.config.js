const router = require("express").Router();
const celebrities = require("../controllers/celebrities.controller");
const movies = require("../controllers/movies.controller");

// CELEBRITIES
router.get("/celebrities/new", celebrities.create);
router.post("/celebrities", celebrities.doCreate);
router.get("/celebrities", celebrities.list);
router.get("/celebrity/:id", celebrities.detail);
router.get("/celebrity/:id/edit", celebrities.edit);
router.post("/celebrity/:id", celebrities.doEdit);
router.post("/celebrity/:id/delete", celebrities.delete);

// MOVIES
router.get("/movies/new", movies.create);
router.post("/movies", movies.doCreate);
router.get("/movies", movies.list);
router.get("/movie/:id", movies.detail);
router.get("/movie/:id/edit", movies.edit);
router.post("/movie/:id", movies.doEdit);
router.post("/movie/:id/delete", movies.delete);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("home");
});

module.exports = router;
