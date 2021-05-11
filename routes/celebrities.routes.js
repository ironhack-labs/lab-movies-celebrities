const express = require("express");
const router = new express.Router();
const CelebrityModel = require("./../models/celebrity.model");

router.get("/", (req, res, next) => {
  console.log(">>> celebrities");
  CelebrityModel.find()
    .then((dbResult) => {
      res.render("celebrities/celebrities", { celebrities: dbResult });
    })
    .catch((dbErr) => next(dbErr));
});

router.get("/new", (req, res, next) => {
  CelebrityModel.find().then((dbResult) => {
    res.render("celebrities/new-celebrity", { celebrities: dbResult });
  });
});

router.post("/new", (req, res, next) => {
  console.log(req.body);
  CelebrityModel.create(req.body)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => res.redirect("/new"));
});

router.get("/delete-celebrity/:id", (req, res, next) => {
    CelebrityModel.findByIdAndDelete(req.params.id)
      .then((dbSuccess) => {
        res.redirect("/celebrities");
      })
      .catch((dbErr) => {
        next(dbErr);
      });
  });

module.exports = router;
