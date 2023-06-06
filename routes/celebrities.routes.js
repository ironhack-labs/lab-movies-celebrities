const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", (req, res, next) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };
  Celebrity.create(newCelebrity)
    .then((newCelebrity) => {
      req.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("celebrities/celebrities", { celebrities: celebritiesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
