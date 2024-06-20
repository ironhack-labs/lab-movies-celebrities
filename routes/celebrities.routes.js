// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

// Create Celebrities - iterarion 3
router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

// Insert info about the celebrities - iterarion 3
router.post("/celebrities/create", async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    console.log(name);
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities/create");
  } catch (error) {
    console.log(error);
  }
});

// Dipslay the celebrities in a list - iteration 4
router.get("/celebrities", async (req, res) => {
  try {
    let allCelebritiesFromDB = await Celebrity.find();
    console.log(allCelebritiesFromDB);
    res.render("celebrities/celebrities.hbs", {
      celebrities: allCelebritiesFromDB,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
