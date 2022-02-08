const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("celebrities/celebrities", { celebrity: celebritiesFromDB });
    })
    .catch((err) => console.log("Error", err));
});

router.get("/create", (req, res, next) =>
  res.render("celebrities/new-celebrity")
);

router.post("/create", (req, res, next) => {
  const celebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };
  Celebrity.create(celebrity)
    .then((celebrity) => {
      res.redirect("/");
    })
    .catch((err) => console.log("Error", err));
});

module.exports = router;
