const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  if (!name || !occupation || !catchPhrase) {
    return next("Please provide all required fields");
  }
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log(`ERROR creating Celebrity: ${err}`);
      res.redirect("/celebrities/create");
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities: celebrities });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;