const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");


module.exports.list = (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => next(err));
}

module.exports.create = (req, res, next) => {
    res.render("celebrities/create-celebrity");
  };

module.exports.doCreate = (req, res, next) => {
    Celebrity.create(req.body)
    .then((celebrity) => {
        res.redirect(`/celebrities/create`);
    })
    .catch((err) => {
        res.render("celebrities/create-celebrity")
    });
};