const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  // console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })

    .then(
      (celebrityFromDB) =>
        console.log(`New celebrity created: ${celebrityFromDB.name}.`),
      res.redirect("/celebrities/celebrities")
    )
    .catch((error) => next(error), res.redirect("/celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((allTheCelebritysFromDB) => {
      console.log("Retrieved celebrity from DB:", allTheCelebritysFromDB);

      res.render("celebrities/celebrities.hbs", {
        celebrity: allTheCelebritysFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while getting the celebrities from the DB: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

module.exports = router;
