const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) =>
  res.render("celebrities/new-celebrity")
);

router.post("/create", (req, res, next) => {
  const celebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPrase: req.body.catchPrase,
  };
  Celebrity.create(celebrity)
    .then((celebrity) => {
      res.redirect("/");
    })
    .catch((err) => console.log("Error", err));
});

module.exports = router;
