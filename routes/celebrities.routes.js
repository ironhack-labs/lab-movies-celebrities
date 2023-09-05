const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

// Create
router.get("/celebrities/create", (req, res) =>
  res.render("celebrities/new-celebrity")
);

router.post("/celebrities/create", (req, res, next) => {
    console.log(req.body);
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((error) => {
      res.redirect("/celebrities/new-celebrity");
      next(error);
    });
});

//show all
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then((allTheCelebritiesFromDB) => {
      console.log("Retrieved celebrities from DB:", allTheCelebritiesFromDB);

      res.render("celebrities/celebrities.hbs", {
        celebrities: allTheCelebritiesFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while getting all celebrities from the DB: ", error);

      next(error);
    });
});

module.exports = router;
