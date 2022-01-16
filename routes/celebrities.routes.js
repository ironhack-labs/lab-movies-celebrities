// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", async function (req, res, next) {
  try {
    await CelebrityModel.create(req.body);
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

router.get("/celebrities", (req, res, next) =>{
CelebrityModel
.find()
.then((celebrity =>{ res.render("celebrities/celebrities", {celebrity})
}))
.catch(error => console.log(error))
});

module.exports = router;
