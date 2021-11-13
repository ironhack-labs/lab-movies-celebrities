const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      res.redirect("/celebrities");
    })
    .catch(() => res.render("celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res) => {
  Celebrity.find().then((celebs) => {
    console.log(celebs);
    res.render("celebrities/celebrities", { celebs: celebs });
  });
});

module.exports = router;
