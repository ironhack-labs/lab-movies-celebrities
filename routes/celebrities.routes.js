const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
require("../db");

// Listing all the Celebrities we have in Database
router.get("/celebrities", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    console.log(celebrities);
    res.render("celebrities/celebrities", { celebrities });
  } catch (err) {
    console.log(err);
  }
});

// Creating a new Celebrity and POST -ing do Database
router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    console.log(name);
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (err) {
    res.render("/celebrities/new-celebrity");
  }
});
// end of creating celebrity

module.exports = router;
