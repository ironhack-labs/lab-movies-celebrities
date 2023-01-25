const Celebrity = require('../models/Celebrity.model')

module.exports.list = (req, res, next) => {
    Celebrity.find()
    .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
    .catch(err => console.error(err))
};

module.exports.create = (req, res, next) => {
    res.render('celebrities/new-celebrity');
};

module.exports.doCreate = (req, res, next) => {
    Celebrity.create(req.body)
    .then((newCelebrity) => {
        res.redirect('/celebrities')
        console.info(`${newCelebrity.name} has been created`)
    })
    .catch((err) => {
        res.render('celebrities/new-celebrity');
        console.error(err)
    })
};