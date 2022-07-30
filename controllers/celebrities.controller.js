const createError = require('http-errors') // ¿Por donde paso esto?

//CRUD de Celebrities
const Celebrity = require('../models/Celebrity.model')

//READ
module.exports.create = (req, res, next) => {
    res.render('celebrities/new-celebrity')
}

module.exports.doCreate = (req, res, next) => {
    const data = {}

console.log(req.body);
    Celebrity.create(req.body)
        .then(createdCelebrity => {
            console.log(createdCelebrity)

            res.redirect('/celebrities')
        })
        .catch(err => next(err))// ¿Por que metemos el NEXT dentro?
}

module.exports.list = (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render('celebrities/celebrities', { celebrities, celebrity: { name: 'Juan'} })
    })
    .catch(next)
}