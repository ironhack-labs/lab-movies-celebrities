// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebs = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
  Celebs.find()
    .then((celebs) => {
      res.render("celebrities/celebrities", { celebs });
    })
    .catch((err) => next(err));
});

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrities");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebs.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((err) => next(err));
});

module.exports = router;
