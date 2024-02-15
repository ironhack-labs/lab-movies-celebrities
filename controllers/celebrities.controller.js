const Celerbity = require("../models/Celebrity.model");

module.exports.list = (req, res, next) => {
  Celerbity.find({})
    .sort({ createdAt: -1 })
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch(() => {});
};

module.exports.create = (req, res, next) => {
  res.render("celebrities/new");
};

module.exports.doCreate = (req, res, next) => {
  Celerbity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  })
    .then(() => {
      res.redirect(`/celebrities`);
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Celerbity.findById(req.params.id)
    .then((celebrity) => {
      res.render("celebrities/detail", { celebrity });
    })
    .catch(() => {});
};

module.exports.edit = (req, res, next) => {
  Celerbity.findById(req.params.id)
    .then((celebrity) => {
      res.render(`celebrities/edit`, {
        celebrity: celebrity,
      });
    })
    .catch(() => {});
};

module.exports.doEdit = (req, res, next) => {
  Celerbity.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  })
    .then((celebrity) => {
      res.redirect(`/celebrity/${celebrity.id}`);
    })
    .catch(() => {});
};

module.exports.delete = (req, res, next) => {
  Celerbity.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(() => {});
};
