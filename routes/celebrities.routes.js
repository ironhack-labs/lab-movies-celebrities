const Celebrity = require("../models/Celebrity.model");


module.exports.newCelebrity = (req, res, next) => {
  res.render("celebrities/new-celebrity");
};

module.exports.create = (req, res, next) => {
  
  Celebrity.create(req.body)
  .then(() => {
    res.redirect('/celebrities')
  })
  .catch(err => res.send(err))
};

module.exports.find = (req, res, next) => {
  Celebrity.find()
  .then(celebrities => {
    res.render("celebrities/celebrities.hbs", {celebrities})
  })
  .catch(err => res.send(err))
};

