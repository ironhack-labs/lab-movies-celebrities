const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebrityList) =>
      res.render("../views/celebrities/celebrities.hbs", { celebrityList })
    )
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res, next) => {
  res.render("../views/celebrities/new-celebrity.hbs");
});

router.post("/create", (req, res, next) => {
  Celebrity.create(req.body)
    .then(res.redirect("/celebrities"))
    .catch((err) => {
      console.log(err);
      res.render("../views/celebrities/new-celebrity.hbs");
    });
});

module.exports = router;
