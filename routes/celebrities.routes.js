// Iteration #3
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// GET route for celebrities/create:
router.get("/celebrities/create", (req, res) => res.render("celebrities/new-celebrity"));

// POST route for celebrities/create:
router.post("/celebrities/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.findOne({ name })
      .then((celebrityFromDB) => {
        if (!celebrityFromDB) {
          Celebrity.create({ name, occupation, catchPhrase })
          .then(() => res.redirect('/celebrities'));
        } else {
          res.render("/celebrities/create", { message: "It seems this celebrity is already created." });
          return;
        }
      })
      .catch((err) => console.log(`Error while creating a new celebrity: ${err}`));
  });

// GET all celebrities from the database:
router.get("/celebrities", (req, res) => {
    Celebrity.find()
      .then((celebritiesFromDB) => res.render("celebrities/celebrities", { celebrities: celebritiesFromDB }))
      .catch((err) => console.log(`Error while getting celebrities from the database: ${err}`));
  });

module.exports = router;