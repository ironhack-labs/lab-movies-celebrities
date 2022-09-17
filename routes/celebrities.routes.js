const router = require("express").Router();
const Celebrities = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res) => {
  console.log(res.body);
  try {
    const newCelebrity = new Celebrities({ ...req.body });
    await newCelebrity.save();
    res.redirect(`/celebrities/${newCelebrity._id}`);
  } catch (err) {
    res.render("/celebrities/new-celebrity.hbs");
  }
});

module.exports = router;
