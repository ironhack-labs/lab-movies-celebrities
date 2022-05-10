const { default: mongoose } = require("mongoose");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch(() => res.render("/celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find({}).then((celeb) => res.render("celebrities/celebrities", {celeb})) .catch((err) => console.log(err))
})

module.exports = router;
