const Celebrity = require("../models/Celebrity.model")

module.exports.create = (req, res, next) => {
  res.render("celebrities/new-celebrity")
}

module.exports.doCreate = (req, res, next) => {
  if(req.body.name && req.body.occupation && req.body.catchPhrase) {
    Celebrity.create(req.body)
    .then(() => {
      res.redirect("/celebrities")
    })
    .catch(next)
  } else {
    res.redirect("/celebrities/create")
  }
}

module.exports.list = (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render("celebrities/celebrities", { celebrities })
    })
    .catch(next)
}