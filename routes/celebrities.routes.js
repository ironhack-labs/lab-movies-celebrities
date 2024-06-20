const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

//Form to create new Celebrity
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

//Post new Celebrity
router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(({ name, occupation, catchPhrase }) => res.redirect("/celebrities"))

    .catch(() => {
      res.redirect("/celebrities/new-celebrity");
      // next(e)
    });
});

// Listing Our Celebrities
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("celebrities/celebrities.hbs", {
        celebrities: allCelebrities,
      });
    })
    .catch((e) => next(e));
});

module.exports = router;
