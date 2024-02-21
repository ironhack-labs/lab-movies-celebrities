const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesDB) => {
      res.render("celebrities/celebrities", { celebritiesDB });
    })
    .catch((err) => next(err));
});

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      res.redirect("/");
    })
    .catch((err) => next(err));
});

module.exports = router;
