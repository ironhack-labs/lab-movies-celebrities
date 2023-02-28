const router = require("express").Router();
const celebrity = require("../models/Celebrity.model");

// Create new celebrity
router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  if (name !== "" && occupation !== "" && catchPhrase !== "") {
    celebrity
      .create({ name, occupation, catchPhrase })
      .then((newCelebrity) => {
        res.render("celebrities/celebrities", { celebrity: newCelebrity });
      })
      .catch((err) => next(err));
  } else {
    res.redirect("/celebrities/create");
  }
});

// Display all celebrities
router.get("/celebrities", (req, res) => {
  celebrity
    .find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrity: celebrities });
    })
    .catch((err) => next(err));
});

module.exports = router;