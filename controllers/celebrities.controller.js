const Celebrity = require("../models/celebrity.model");
const mongoose = require("mongoose");

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
