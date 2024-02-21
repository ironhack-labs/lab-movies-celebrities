const Celeb = require('../models/Celebrity.model')


module.exports.create = (req, res, next) => {
    res.render('celebrities/new-celebrity')
}

module.exports.doCreate = (req, res, next) => {
    const celeb = req.body
    Celeb.create(celeb)
        .then((celeb) => res.render('/celebrities'))
        .catch((error) => res.redirect('/new-celebrity'))
}

