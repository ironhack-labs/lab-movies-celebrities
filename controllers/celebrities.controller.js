const Celeb = require('../models/Celebrity.model')


module.exports.create = (req, res, next) => {
    res.render('celebrities/new-celebrity')
}

module.exports.doCreate = (req, res, next) => {
    const celeb = req.body
    Celeb.create(celeb)
        .then((celeb) => res.redirect('/celebrities'))
        .catch((error) => res.render('/new-celebrity'))
}

module.exports.list = (req, res, next) => {
    Celeb.find()
        .then((celebs) => res.render('celebrities/celebrities', { celebs }))
        .catch((error) => next(error))
}