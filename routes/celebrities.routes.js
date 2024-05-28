// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/", (req, res, next) => {
    Celebrity.find().then((data) => {
        res.render("celebrities", {celebrities: data});
    })
});

router.get("/create", (req, res, next) => {
  res.render("new-celebrity");
});

router.post("/create", (req, res, next) => {
  Celebrity.create(req.body)
    .then((data) => {
      res.redirect('/celebrities')
    })
    .catch((error) => console.log(error));
});

module.exports = router;
