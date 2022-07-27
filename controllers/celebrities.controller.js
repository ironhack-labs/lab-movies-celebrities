const Celebrity = require("../models/Celebrity.model");

//read - find all celebrieties

module.exports.celebrieties = (req, res, next) => {
    Celebrity.find().then((celebrieties) => {
      res.render("celebrieties/celebrieties", { celebrieties });
    });
  };

//create a new celebrity

module.exports.createCelebrity = (req, res, next) => {
    res.render("celebrieties/new-celebrity");
  };

module.exports.doCreate = (req, res, next) => {
    Celebrity.create(req.body)
      .then((createdCelebrity) => {
        res.redirect("/celebrieties");
      })
      .catch(next);
  };

//edit a celebrity

module.exports.editCelebrity = (req, res, next) => {
    const { id } = req.params;

    Celebrity.findByIdAndUpdate(id)
      .then((updatedCelebrity) => {
        res.render("celebrieties/new-celebrity", { updatedCelebrity, isEdit: true });
      })
      .catch(next);
  };

  module.exports.doEdit = (req, res, next) => {
    const { id } = req.params;

    Celebrity.findByIdAndUpdate(id, req.body, { new: true })
      .then((updatedCelebrity,) => {
        res.redirect("/celebrieties");
      })
      .catch(next);
  };

//delete a celebrity

module.exports.delete = (req, res, next) => {
    const { id } = req.params;

    Celebrity.findByIdAndDelete(id)
      .then((deletedCelebrity) => {
        res.redirect("/celebrieties");
      })
      .catch(next);
  }; 