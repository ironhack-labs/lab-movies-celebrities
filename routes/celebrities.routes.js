const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");

// Route to show all celebrities
router.get("/", (req, res) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render("celebrities/celebrities", { celebrities });
      })
      .catch((error) => {
        console.log(error);
        res.redirect("/");
      });
  });

// Route to show the form to create a celebrity
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

// Route to handle the form submission and create a new celebrity
router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  // Create a new instance of the Celebrity model
  const newCelebrity = new Celebrity({
    name,
    occupation,
    catchPhrase,
  });

  // Save the new celebrity to the database
  newCelebrity
    .save()
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      res.render("celebrities/new-celebrity", { error });
    });
});

module.exports = router;