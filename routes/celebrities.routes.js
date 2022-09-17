const router = require("express").Router();
const { Celebrity } = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities", async (req, res) => {
  const allCelebrities = await Celebrity.find();
  console.log(allCelebrities);
  res.render("celebrities/celebrities", { allCelebrities });
});

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res) => {
  console.log(res.body);
  try {
    const newCelebrity = new Celebrity({ ...req.body });
    await newCelebrity.save();
    res.render("celebrities/celebrities");
  } catch (err) {
    res.render("celebrities/new-celebrity");
  }
});

module.exports = router;
