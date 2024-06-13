// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = express();

const Celebrity = require("../models/Celebrity.model");

// all your routes here

//GET route - show all celebrities
router.get("/celebrities", async (req, res) => {
  try {
    const result = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities: result });
  } catch (error) {
    res.json({ message: "Error fetching celebrities from db" });
  }
});
//GET request - celebrities/create - show a form to create celebrity
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

//POST request - celebrities/create - send this data from form to create and save to db
router.post("/create", async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    res.render("celebrities/new-celebrity.hbs");
  }
});
module.exports = router;
