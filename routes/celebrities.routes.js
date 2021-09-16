// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(req.body);
  Celebrity.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => res.redirect("/celebrities"))
    .catch((error) => res.render("celebrities/new-celebrity"));
});

module.exports = router;
