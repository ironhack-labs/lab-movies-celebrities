const router = require("express").Router();

module.exports = (app) => {
  app.use("/celebrities", require("../routes/celebrities.routes"));
  app.use("/movies", require("../routes/movies.routes"));
};

// REQUERIR MODELS CREO QUE AQUÍ

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
