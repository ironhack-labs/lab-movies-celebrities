const Celebrities = require("../models/Celebrity.model");
const router = require("express").Router();

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const celebInfo = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebrities.create(celebInfo)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      console.log("error creating a celebrity", error);
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrities.find()
    .then((celebritiesArr) => {
      res.render("celebrities/celebrities", { celebrities: celebritiesArr });
    })
    .catch((err) => {
      console.log("error getting all celebrities:", err);
    });
});

module.exports = router;
