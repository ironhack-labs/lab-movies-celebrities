const Celeb = require('../models/Celebrity.model')


module.exports.create = (req, res, next) => {
    res.render('celebrities/new-celebrity')
}

module.exports.doCreate = (req, res, next) => {
    const celeb = req.body
    Celeb.create(celeb)
        .then((celeb) => res.redirect('/celebrities'))
        .catch((error) => next(error))
}

module.exports.list = (req, res, next) => {
    Celeb.find()
        .then((celebs) => res.render('celebrities/celebrities', { celebs }))
        .catch((error) => next(error))
}

module.exports.detail = (req, res, next) => {
    const { id } = req.params
    Celeb.findById(id)
        .then((celeb) => res.render('celebrities/celeb-details', { celeb }))
        .catch((error) => next(error))
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params
    Celeb.findByIdAndRemove(id)
        .then(() => res.redirect('/celebrities'))
        .catch((error) => next(error))
}

module.exports.edit = (req, res, next) => {
    const { id } = req.params
    Celeb.findById(id)
        .then((celeb) => res.render('celebrities/edit-celeb', { celeb }))
        .catch((error) => next(error))
}

module.exports.doEdit = (req, res, next) => {
    Celeb.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        .then((celeb) => res.redirect(`/celebrities/${celeb.id}`))
        .catch((error) => next(error))
}