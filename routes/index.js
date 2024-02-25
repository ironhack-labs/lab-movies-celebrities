const router = require("express").Router();
const celebrities = require("../controllers/celebrities.controller");
const movies = require("../controllers/movies.controller");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Add celebrity
router.get("/new-celebrity", celebrities.create);
router.post("/new-celebrity", celebrities.doCreate);

// List celebrities
router.get("/celebrities", celebrities.list);

// Add movie
router.get("/new-movie", movies.create);
router.post("/new-movie", movies.doCreate);

// List movies
router.get("/movies", movies.list);
router.get("/movies/:id", movies.detail);

// Delete movies
router.get("/movies/:id/delete", movies.delete);

// Edit movies
router.get("/movies/:id/edit", movies.edit);
router.post("/movies/:id/edit", movies.doEdit);

module.exports = router;
