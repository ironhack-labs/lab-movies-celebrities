// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const celebritiesController = require("../controllers/celebrities.controller");
const routeGuards = require("./../middlewares/route-guard");
//const { name, ocupation, catchPhrase } = req.body

// all your routes here
//muestra el formulario
router.get("/create", routeGuards.isLoggedIn, (req, res) => {
  res.render("celebrities/new-celebrity");
});

//esta ruta recibe la info del formulario
router.post("/create", routeGuards.isLoggedIn, celebritiesController.createCelebrity);

router.get("/", routeGuards.isLoggedIn, celebritiesController.allCelebrities);

module.exports = router;
