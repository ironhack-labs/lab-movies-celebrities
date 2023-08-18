//const Celebrity = require("../models/celebrity.model");

const Celebrity = require("../models/Celebrity.model");

module.exports.create = (req, res, next) => {
    res.render("celebrities/new-celebrity");
  };

module.exports.doCreate =(req, res, next) => {
   
  Celebrity.create({
    name: req.body.name,
    occupation : req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  })
    .then(() => {
      res.redirect("/celebrities/list");
    })
    .catch(next);
}

module.exports.list = (req, res, next) => {
    
    Celebrity.find()
      .sort({ createdAt: -1 })
      .then((celebrities) => {
        res.render("celebrities/list", { celebrities });
      })
      .catch(() => {});
  };