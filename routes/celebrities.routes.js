const express = require("express");
const router = express.Router();

const { Celeb } = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res) => {
  try {
    const newCeleb = new Celeb({ ...req.body });
    await newCeleb.save();
    res.redirect("/celebrities");
  } catch (error) {
    res.render("error");
  }
});

router.get("/celebrities", async (req, res) => {
  try {
    const celebrities = await Celeb.find({});
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    res.render("error");
  }
});

module.exports = router;
