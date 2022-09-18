const router = require("express").Router();

const { Celebrity } = require("../models/Celebrity.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  const celebrities = await Celebrity.find();
  res.render("./celebrities/celebrities",{ celebrities });
});

router.get("/create", (req, res, next) => {
  res.render("./celebrities/new-celebrity");
});

router.post("/create", async (req, res, next) => {
  try {
    const newCelebrity = new Celebrity({ ...req.body });
    await newCelebrity.save();
    res.redirect("/celebrities");
  } catch (err) {
    res.render("error");
  }
});

module.exports = router;
