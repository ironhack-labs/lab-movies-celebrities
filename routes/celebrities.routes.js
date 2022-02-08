const router = require("express").Router();
const Celebs = require("../models/Celebrity.model");
//const Movie = require("../models/Author.model");

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrities");
});

router.post("/create", (req, res, next) => {
  const celebDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebs.create(celebDetails)
    .then((celeb) => {
      res.redirect("celebrities/celebrities-list");
    })
    .catch((err) => res.render("celebrities/new-celebrities"));
});

router.get("/celebrities-list", (req, res, next) => {
  Celebs.find()
    .then((celebsArr) => {
      res.render("celebrities/celebrities-list", { celebs: celebsArr });
    })
    .catch((err) => {
      console.log("sorry", err);
    });
});

module.exports = router;
