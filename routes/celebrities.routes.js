const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// GET /celebrities/create
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

// POST /celebrities/create
router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      console.log(err);
      res.render("celebrities/new-celebrity.hbs");
    });
});

// GET /celebrities
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) =>
      res.render("celebrities/celebrities.hbs", { allCelebrities })
    )
    .catch((err) => next(err));
});

module.exports = router;
