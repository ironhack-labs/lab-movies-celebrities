// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");
// all your routes here

router.get("/create-celebrity", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create-celebrity", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((error) => next(error));
});

router.get("/celebrities/", (req, res, next) => {
  Celebrity.find().then((allCelebrities) => {
    res.render("../views/celebrities/celebrities.hbs", {
      celebrity: allCelebrities,
    });
  });
});

router.get("/celebrities/", (req, res, next) => {
  res.render("celebrities/celebrities", { Celebrity });
});

module.exports = router;
