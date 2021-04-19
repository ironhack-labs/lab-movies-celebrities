const express = require("express");
const Celebrity = require("../models/Celebrity.model");
const router = express.Router();


router.get("/new", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs")
});
router.post("/new", (req, res, next) => {
    Celebrity.create(req.body)
    .then((result) => {
        console.log(result)
        res.redirect("/celebrities/all")
    }).catch((err) => {
        console.log(err);
        res.render("celebrities/new-celebrity.hbs")
    });
});

router.get(`/all`, (req, res) => {
  Celebrity.find({})
    .then((result) => {
      res.render("celebrities/celebrities.hbs", { celebs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
