const Celebrity = require ("../models/Celebrity.model");

module.exports.list = (req, res, next) => {
    Celebrity.find() 
    .then (celebrities => {
        res.render("celebrities/celebrities", {celebrities});
    })
}

module.exports.create = ( req, res, next ) => {
    res.render ("celebrities/form")
}

module.exports.doCreate = (req , res , next) => {
    Celebrity.findById(req.params.id)
    .then(celebrity => {
        res.render( "celebrities/detail", {celebrity})
    })
}