const Celebrity = require("../models/Celebrity.model");

//SEE ALL
module.exports.list = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => next(err));
};

//CREATE NEW
module.exports.create = (req, res, next) => {
  res.render("celebrities/new-celebrity");
};

module.exports.doCreate = (req, res, next) => {
  Celebrity.create(req.body)
    .then((createdCelebrity) => {
      res.redirect("/celebrities");
    })
    .catch((err) => next(err));
};

//SEE DETAILS
module.exports.details = (req, res, next) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/celebrity-details", { celebrity });
    })
    .catch((err) => next(err));
};

//DELETE
module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => next(err));
};

//EDIT
module.exports.edit = (req, res, next) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/edit-celebrity", { celebrity });
    })
    .catch((err) => next(err));
};

module.exports.doEdit = (req, res, next) => {
  const { id } = req.params;

  Celebrity.findByIdAndUpdate(id, req.body, { new: true }) // new true sirve para que te devuelva el nuevo en el then sino te devuelve el viejo
    .then((celebrity) => {
      res.redirect(`/celebrities/${celebrity.id}`);
    })
    .catch((err) => next(err));
};
