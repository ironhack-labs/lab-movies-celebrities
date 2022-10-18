const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// GET "/celebrities/create" => ruta para renderizar formulario
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

// POST "/celebrities/create" => ruta para crear celebrity
router.post("/create", async (req, res, next) => {
  try {
    await Celebrity.create(req.body);
    console.log(req.body);
    res.redirect("/celebrities/celebrities-list");
  } catch (error) {
    res.render("celebrities/new-celebrity.hbs")
    console.log(error)
  }
});

// GET "/celebrities/celebrities-list" => renderiza la lista de famosos
router.get("/celebrities-list", async (req, res, next) => {
  try {
    const celebritiesList = await Celebrity.find().select({ name: 1 });
    res.render("celebrities/celebrities.hbs", { celebritiesList });
    console.log(celebritiesList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
