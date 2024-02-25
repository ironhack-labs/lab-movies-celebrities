const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");

module.exports.create = (req, res, next) =>
  res.render("celebrities/new-celebrity");

module.exports.doCreate = (req, res, next) => {
  const celebrity = req.body;

  Celebrity.create(celebrity)
    .then((celebrity) => res.redirect("/celebrities"))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("celebrities/new-celebrity", {
          celebrity,
          global_err_msg: `Validation error:`,
          errors: error.errors,
        });
      } else if (error.name === "MongoServerError" && error.code === 11000) {
        res.status(400).render("celebrities/new-celebrity", {
          celebrity,
          global_err_msg: `Duplicate key error:`,
          errors: error.keyValue,
        });
      } else {
        next(error);
      }
    });
};

module.exports.list = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) =>
      res.render("celebrities/celebrities", { celebrities })
    )
    .catch((error) => next(error));
};
