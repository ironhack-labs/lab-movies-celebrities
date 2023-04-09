const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.get("/all", (req, res) => {
  res.render("celebrities/celebrities");
});

router.post("/create", async (req, res) => {
  try {
    const newCelebrity = await CelebrityModel.create(req.body);
    console.log("New celebrity Created ", newCelebrity);
    res.redirect("/all");
  } catch (err) {
    console.log("there was an error", err);
    res.redirect("/create");
  }
});

module.exports = router;
