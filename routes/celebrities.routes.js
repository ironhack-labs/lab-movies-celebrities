const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    await Celebrity.create({ name, occupation, catchPhrase });
  } catch (err) {
    res.redirect("celebrities/create");
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    console.log(allCelebrities);
    res.render("celebrities/celebrities", { allCelebrities });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
