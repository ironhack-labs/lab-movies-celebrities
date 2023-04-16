// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// require Celebrity model in order to use it
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities", (req, res, next) => {
  Celebrity.find().then((celebs) => {
    let allCelebs = celebs;
    res.render("celebrities/celebrities", [allCelebs]);
  });
});

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { celebrity } = req.body;
  console.log(req.body);
  Celebrity.create({ celebrity });
  console.log(celebrity);
});

module.exports = router;
