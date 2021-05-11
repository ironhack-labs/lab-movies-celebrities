const express = require("express");
const router = new express.Router();
const CelebrityModel = require("../models/celebrity.model.js");

//new-celebrities.hbs
router.get("/new", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create",(req, res, next) => {
    CelebrityModel.create(req.body)
      .then(() => res.redirect("/celebrities"))
      .catch(next);
  });

//celebrities.hbs
router.get("/", (req, res, next) => {
  CelebrityModel.find()
    .then((result) =>
      res.render("celebrities/celebrities", { celebrities: result })
    )
    .catch(next);
});

//edit-celebrities.hbs
router.get("/edit-celebrity/:id", (req, res, next) => {
  CelebrityModel.findById(req.params.id)
    .then((result) =>
      res.render("celebrities/edit-celebrity", { celebId: result }))
    .catch(next);
});

router.post("/edit-celebrity/:id", (req, res, next) => {
  CelebrityModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect("/celebrities"))
    .catch(next);
});

//delete celebrities
router.get("/delete/:id", (req, res, next) => {
  CelebrityModel.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/celebrities"))
    .catch(next);
});

//details
router.get("/celebrity-details/:id", (req, res, next) => {
  CelebrityModel.findById(req.params.id)
    .then((celebrity) =>
      res.render("celebrities/celebrity-details", { celebDetails: celebrity })
    )
    .catch(next);
});

module.exports = router;
