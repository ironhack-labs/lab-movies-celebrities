// celebrities.routes.js

const express = require("express");
const router = express();
const Celebrity = require("../models/Celebrity.model");

// GET route to render the form
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

// POST route to handle form submission
router.post("/create", async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;

    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
    res.render("celebrities/new-celebrity.hbs");
  }
});

// Add other routes as needed

router.get("/", async (req, res, next) => {
  try {
    const result = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities: result });
  } catch (error) {
    console.log(err);
  }
});

module.exports = router;
