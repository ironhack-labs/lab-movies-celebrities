// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const celebritiesController = require("../controllers/celebrities.controller")

//const { name, ocupation, catchPhrase } = req.body

// all your routes here
//muestra el formulario
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity")
})

//esta ruta recibe la info del formulario 
router.post("/celebrities/create", celebritiesController.createCelebrity)

router.get("/celebrities", celebritiesController.allCelebrities)

module.exports = router;
