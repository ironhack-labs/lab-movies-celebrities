const Celebrity = require("../models/celebrity.model");
const mongoose = require("mongoose");
const createError = require("http-errors");

module.exports.create = (req, res, next) => res.render("celebrities/new-celebrity");

module.exports.doCreate = (req, res, next) => {
  const celebrity = req.body;

  Celebrity.create(celebrity)
    .then((celebrity) => res.redirect("/celebrities"))
    .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          res
            .status(400)
            .render("celebrities/new-celebrity", { celebrity, errors: error.errors });
        } else {
          next(error);
        }
  });
};

module.exports.list = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => res.render("celebrities/list", { celebrities }))
    .catch((error) => next(error));
};

module.exports.details = (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      if (!celebrity) {
        next(createError(404, "Celebrity not found"));
      } else {
        res.render("celebrities/celebrity-details", { celebrity });
      }
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Celebrity.findByIdAndDelete(id)
    .then((celebrity) => {
      if (!celebrity) {
        next(createError(404, 'Celebrity not found'));
      } else {
        res.redirect("/celebrities");
      }
    })
    .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
  Celebrity.findById(req.params.id)
      .then((celebrity) => {
          if (!celebrity) {
          next(createError(404, "Celebrity not found"));
          } else {
          res.render("celebrities/edit-celebrity", { celebrity });
          }
      })
      .catch((error) => next(error));
};

module.exports.doEdit = (req, res, next) => {
  const celebrity = req.body;
  celebrity.id = req.params.id;

  Celebrity.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
      .then((celebrity) => {
          if (!celebrity) {
          next(createError(404, "Celebrity not found"));
          } else {
          res.redirect(`/celebrities/${celebrity.id}`);
          }
      })
      .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
          res
              .status(400)
              .render("celebrities/edit-celebrity", { celebrity: req.body, errors: error.errors });
          } else {
          next(error);
          }
      });
};