const Celebrity = require("../models/Celebrity.model");

module.exports.createCelebrity = (req, res, next) => {
  res.render("celebrities/new-celebrity");
};

module.exports.exportCelebrity = (req, res, next) => {
  Celebrity.create(req.body)
    .then((clebrityCreated) => {
      console.log(clebrityCreated);
      res.redirect("/celebrities");
    })
    .catch((err) => next(err));
};

module.exports.showCelebrities = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => next(err));
};
