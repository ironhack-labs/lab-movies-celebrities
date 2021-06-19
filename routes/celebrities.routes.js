const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

module.exports.home = (req, res, next) => {
    Celebrity.find()
    .then((celebrities)=>{
        res.render("celebrities/celebrities.hbs", {celebrities});
    })
  
};

module.exports.createCelebrity = (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
};

module.exports.doCreateCelebrity = (req, res, next) => {
  Celebrity.create(req.body)
    .then((celebrity) => {
      res.redirect("/celebrities");
    })
    .catch((e) => res.render("celebrities/new-celebrity.hbs"));
};
