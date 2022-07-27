const Celebrity = require("../models/Celebrity.model");

//read - find all celebrieties

module.exports.celebrities = (req, res, next) => {
    Celebrity.find().then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    });
  };

//create a new celebrity

module.exports.createCelebrity = (req, res, next) => {
    res.render("celebrities/new-celebrity");
  };

module.exports.doCreate = (req, res, next) => {
    Celebrity.create(req.body)
      .then((createdCelebrity) => {
        res.redirect("/celebrities");
      })
      .catch(next);
  };

//edit a celebrity

module.exports.editCelebrity = (req, res, next) => {
    const { id } = req.params;

    Celebrity.findByIdAndUpdate(id)
      .then((updatedCelebrity) => {
        res.render("celebrities/new-celebrity", { updatedCelebrity, isEdit: true });
      })
      .catch(next);
  };

  module.exports.doEdit = (req, res, next) => {
    const { id } = req.params;

    Celebrity.findByIdAndUpdate(id, req.body, { new: true })
      .then((updatedCelebrity,) => {
        res.redirect("/celebrities");
      })
      .catch(next);
  };

//delete a celebrity

module.exports.delete = (req, res, next) => {
    const { id } = req.params;

    Celebrity.findByIdAndDelete(id)
      .then((deletedCelebrity) => {
        res.redirect("/celebrities");
      })
      .catch(next);
  }; 