const CelebModel = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("celebs/new-celeb");
});

router.post("/create", async (req, res) => {
  try {
    const newCelebCreated = await CelebModel.create(req.body);
    console.log("NEW CELEBRITY", newCelebCreated);
    res.redirect("/celebs/celebslist");
  } catch (err) {
    res.redirect("/celebs/create");
    console.log("new celebrity post error", err);
  }
});

router.get("/celebslist", async (req, res) => {
  try {
    const allCelebs = await CelebModel.find();
    res.render("..views/celebs/allCelebs", { allCelebs });
  } catch {
    res.send("Oops, an error, go back");
  }
});

module.exports = router;
