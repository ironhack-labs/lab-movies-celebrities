// IMPORT CELEBRITY MODEL
const Celebrity = require('../models/Celebrity.model')

// LIST ALL CELEBRITIES

module.exports.list = (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render('celebrities/celebrities', {celebrities})
    })
    .catch(err => console.log(err))
}

// ADDING NEW CELEBRITIES

module.exports.create = (req, res, next) => {
    res.render('celebrities/new-celebrity')
};

module.exports.doCreate = (req, res, next) => {
    Celebrity.create(req.body)
    .then(celebrityCreated => {
        res.redirect('/celebrities')
    })
    .catch(res.render('celebrities/new-celebrity'))
    
}

// CELEBRITY DETAIL

module.exports.detail = (req, res, next) => {
    const { id } = req.params

    Celebrity.findById(id)
    .then(celebrity => {
        res.render('celebrities/celebrity-detail', { celebrity })
    })
    .catch(err => console.log(err))
}

// DELETE CELEBRITIES

module.exports.delete = (req, res, next) => {
    const { id } = req.params

    Celebrity.findByIdAndDelete(id)
    .then( celebrityDeleted => {
        res.redirect('/celebrities')
    })
    .catch(err => console.log(err))
}

// EDIT CELEBRITIES

module.exports.edit = (req, res, next) => {
    const { id } = req.params

    Celebrity.findById(id)
    .then(celebrity => {
        res.render('celebrities/edit-celebrity', { celebrity })
    })
    .catch(err => console.log(err))
}

module.exports.doEdit = (req, res, next) => {
    const { id } = req.params

    Celebrity.findByIdAndUpdate(id, req.body, { new: true })
    .then(celebrity => {
        res.redirect(`/celebrities/${id}`)
    })
    .catch(err => console.log(err))
}