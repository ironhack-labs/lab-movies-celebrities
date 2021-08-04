const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");

// Iteration#3 Adding New Celebrities
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch(() => res.render("celebrities/new-celebrity.hbs"));
});

// Iteration#4 Listing Celebrities
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("celebrities/celebrities.hbs", { celebrities: celebritiesFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the celebrities from the DB: ", error);
      next(error);
    });
});

module.exports = router;
