const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { id, name, occupation, catchPhrase } = req.body;
  Celebrity.create(req.body)
    .then((result) => {
      console.log("created new user:", result);
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.render("celebrities/new-celebrity");
      console.log(err);
    });
});

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
      .then((result) => {
        res.render("celebrities/celebrities", { result });
      })
      .catch((err) => {
        console.log(err);
      });  });

module.exports = router;
