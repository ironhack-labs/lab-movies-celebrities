const express = require("express");
const celebritiesRouter = new express.Router();
const CelebrityModel = require("./../models/celebrity.model");




// Show a form to CREATE a celebrity
celebritiesRouter.get("/new", async (req, res, next) => {
  const celebrities = await CelebrityModel.find();
  res.render("celebrities/new-celebrity", { celebrities });
});

celebritiesRouter.post("/create", async (req, res, next) => {
  const newCelebrity = { ...req.body };
  console.log(newCelebrity);
  try {
    await CelebrityModel.create(newCelebrity);
    res.redirect("./celebrities");
  } catch (err) {
    res.render("celebrities/new-celebrity")
    next(err);
  }
});

// // Get all celebrities
celebritiesRouter.get("/celebrities", async (req, res, next) => {
  try {
    res.render("celebrities/celebrities", { celebrities: await CelebrityModel.find() });
  } catch (err) {
    next(err);
  }
});


module.exports = celebritiesRouter;