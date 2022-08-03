const Celebrity = require("../models/Celebrity.model");
const mongoose = require("mongoose");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((createCelebrity) => {
      console.log(`${createCelebrity}`);
      res.redirect("/celebrities");
    })
    .catch((err) => next(err));
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((data) => {
      res.render("celebrities/celebrities", { data });
    })
    .catch((err) => next(err));
});

module.exports = router;
