const router = require("express").Router();
const celebrityModel = require("../models/Celebrity.model");
const CelebrityModel = require("../models/Celebrity.model");

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.get("/all", async (req, res) => {
  try{
    const allCelebrities = await CelebrityModel.find();
    res.render("celebrities/celebrities", {allCelebrities});
  }catch(err){
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


module.exports = router;
