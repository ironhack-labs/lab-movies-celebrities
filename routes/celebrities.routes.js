const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

module.exports.home = (req, res, next) => {
  Celebrity.find().then((celebrities) => {
    res.render("celebrities/celebrities.hbs", { celebrities });
  });
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

module.exports.idCelebrity = (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/celebrity-details.hbs", { celebrity });
    })
    .catch((e) => console.error(e));
};

module.exports.editCelebrity = (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) =>
      res.render(`celebrities/edit-celebrity.hbs`, { celebrity })
    )
    .catch((e) => console.error(e));
};

module.exports.doEditCelebrity = (req, res, next) => {
  Celebrity.findByIdAndUpdate(req.params.id, req.body)
    .then((celebrity) => res.redirect(`/celebrities`))
    .catch((e) => console.error(e));
};

module.exports.deleteCelebrity = (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then((celebrity) => res.redirect(`/celebrities`))
    .catch((e) => console.error(e));
};
