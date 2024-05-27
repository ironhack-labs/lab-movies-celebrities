const { create } = require("hbs");
const createCelebrity = require("../views/celebrities/new-celebrity.hbs");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/create", (req, res, next) => {
  res.render("../views/celebrities/new-celebrity.hbs");
});
router.post("/create", async (req, res, next) => {
  try {
    await Celebrity.create(req.body);
    console.log("Created!", req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(500).send("Error submitting form");
  }
});
router.get("/showCelebrity", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();

    res.render("../views/celebrities/celebrities", { celebrities });
  } catch (error) {
    console.error("Error retrieving celebrities:", error);
    res.status(500).send("Error retrieving celebrities");
  }
});

module.exports = router;
