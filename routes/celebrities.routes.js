const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res) => {
  const newCelebrity = await CelebrityModel.create(req.body);
  console.log("New celebrity Created ", newCelebrity);
  res.redirect(`celebrities/new-celebrity${newCelebrity._id}`);
});

module.exports = router;
