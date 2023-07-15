const Celebrity = require('../models/Celebrity.model.js');

module.exports.create = (req, res, next) => {
    res.render('celebrities/new-celebrity');
};

module.exports.doCreate = (req, res, next) => {
    Celebrity.create(req.body)
    .then(celebrityDB => {
        res.redirect('/celebrities')
    }) 
    .catch(err => next(err));
}