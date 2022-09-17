// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { Celebrity } = require("../models/Celebrity.model");

// all your routes here

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res) => {
  console.log(req.body);
  try {
    const newCelebrity = new Celebrity({ ...req.body });
    await newCelebrity.save();
    res.redirect("/celebrities");
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
    res.render("celebrities/new-celebrity");
  }
});

router.get("/", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    console.log(celebrities);
    res.render("celebrities/celebrities", { celebrities });
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
  }
});

module.exports = router;
