const express = require("express");
const router = express.Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => console.log(err));
});

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity", {});
});

router.post("/create", (req, res, next) => {
  Celebrity.create(req.body)
    .then((celeb) => {
      console.log(celeb);
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.render("celebrities/new-celebrity");
    });
});

router.get("/new-celebrity", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

module.exports = router;
