const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');


module.exports.list = (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => res.render('celebrities/list', { celebrities}) )
        .catch((error) => next(error));
}

module.exports.create = (req, res, next) => {
    console.debug (req.body)
    res.render ('celebrities/create');}

module.exports.DoCreate = (req, res, next) => {
    const celebrity = req.body
    Celebrity.create(celebrity)
        .then((celebrity) => res.redirect('/celebrities-list'))
        .catch((error) => {
            if ( error instanceof mongoose.Error.ValidationError){
                console.error(error)
                res.status(400).render('celebrities/create',{celebrity, errors: error.errors })

            }else{
                next(error)
            }
        })
}    