const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((error) => {
      res.render("celebrities/new-celebrity");
      next(error);
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((allCelebs) => {
      console.log("Retrieved celebrities from DB:", allCelebs);
      res.render("celebrities/celebrities.hbs", { allCelebs });
    })
    .catch((error) => {
      console.log("Error while getting the celebrities from the DB: ", error);
      next(error);
    });
});

module.exports = router;
