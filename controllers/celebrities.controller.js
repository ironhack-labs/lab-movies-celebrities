const Celebrity = require('../models/Celebrity.model');

module.exports.create = (req, res, next) => {
    res.render('celebrities/new-celebrity')
};

module.exports.doCreate = (req, res, next) => {
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    })
      .then(() => res.redirect('/celebrities'))
      .catch((error) => next(error))
};

module.exports.list = (req, res, next) => {
    Celebrity
      .find()
      .then((celebrity) => res.render('celebrities/celebrities', { celebrity }))
      .catch((error) => next(error))
}