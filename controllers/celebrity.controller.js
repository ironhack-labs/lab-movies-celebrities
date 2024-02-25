const Celebrity = require('../models/Celebrity.model');

module.exports.list = (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => res.render('celebrities/list', { celebrities }))
        .catch((error) => next(error));
}

module.exports.create = (req, res, next) => res.render('celebrities/new-celebrity');

module.exports.doCreate = (req, res, next) => {
    const celebrity = req.body;
    Celebrity.create(celebrity)
        .then((celebrity) => res.redirect('/celebrities'))
        .catch((error) => next(error));
}