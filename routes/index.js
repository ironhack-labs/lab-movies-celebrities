const router = require("express").Router();
const celebrities = require("./celebrities.routes");
const movies = require("./movies.routes")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/celebrities/create", celebrities.newCelebrity);
router.post("/celebrities/create", celebrities.create);
router.get("/celebrities", celebrities.find);

router.get("/movies/create", movies.newMovie)
router.post("/movies/create", movies.create)
router.get("/movies", movies.find)
router.get("/movies/:movieId/detail", movies.detail)
router.post("/movies/:movieId/delete", movies.delete)
router.get("/movies/:movieId/edit", movies.edit)
router.post("/movies/:movieId/edit", movies.doEdit)

module.exports = router;
