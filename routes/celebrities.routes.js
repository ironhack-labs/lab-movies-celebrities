const router = require("express").Router();
const { Celebrity } = require("../models/Celebrity.model");
const { Movie } = require("../models/Movie.model");

// all your routes here

router.get("/celebrities", async (req, res) => {
  try {
    const allCelebrities = await Celebrity.find();
    console.log(allCelebrities);
    res.render("celebrities/celebrities", { celebrities: allCelebrities });
  } catch (err) {
    res.render("error");
  }
});

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res) => {
  try {
  const newCelebrity = new Celebrity({ ...req.body });
  console.log(req.body);
  await newCelebrity.save();
  console.log(newCelebrity);
  res.redirect("/celebrities");
  } catch (err) {
    res.render("error");
  // }
});

module.exports = router;
