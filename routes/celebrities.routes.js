const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  try {
    res.render("celebrities/new-celebrity");
  } catch (error) {
    next(error);
  }
});

router.post("/celebrities/create", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    const createdCelebrity = await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });
    console.log("A new celebrity has been created:", createdCelebrity.name);
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
    res.redirect("/celebrities/create");
  }
});

router.get("/celebrities", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
