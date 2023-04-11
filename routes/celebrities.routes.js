const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.get("/all", async (req, res) => {
  try {
    const allCelebrities = await CelebrityModel.find();
    res.render("celebrities/celebrities", { allCelebrities });
  } catch (err) {
    console.log("There was an error", err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newCelebrity = await CelebrityModel.create(req.body);
    console.log("New celebrity Created ", newCelebrity);
    res.redirect("/celebrities/all");
  } catch (err) {
    console.log("there was an error", err);
    res.redirect("/celebrities/new-celebrity");
  }
});

router.get("/:celebrityId", async (req, res) => {
  try {
    const { celebrityId } = req.params;
    const celebrityData = await CelebrityModel.findById(celebrityId);
    res.render("celebrities/celebrity-details", { celebrityData });
  } catch (err) {
    console.log("There was an error", err);
  }
});

router.get("/edit/:celebrityId", async (req, res) => {
  try {
    const { celebrityId } = req.params;
    const celebrityData = await CelebrityModel.findById(celebrityId);
    res.render("celebrities/celebrity-edit", { celebrityData });
  } catch (err) {
    console.log("There was an error", err);
  }
});

router.post("/edit/:celebrityId", async (req, res) => {
  try {
    const { celebrityId } = req.params;
    await CelebrityModel.findByIdAndUpdate({ _id: celebrityId }, req.body);
    res.redirect("/celebrities/all");
  } catch (err) {
    console.log("There was an error", err);
  }
});

router.post("/delete/:celebrityId", async (req, res) => {
  try {
    const { celebrityId } = req.params;
    await CelebrityModel.findByIdAndDelete(celebrityId);
    res.redirect("/celebrities/all");
  } catch (err) {
    console.log("There was an error", err);
  }
});

module.exports = router;
