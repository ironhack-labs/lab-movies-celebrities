// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

//Adding a celebrity
router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
  }
});

//Display a list of celebrities
router.get("/celebrities", async (req, res) => {
  try {
    const allCelebritiesFromDB = await Celebrity.find();
    res.render("celebrities/celebrities.hbs", {celebrities: allCelebritiesFromDB});
  } catch (error) {
    console.log("Error while listing celebrities:", error);
  }
});

module.exports = router;
