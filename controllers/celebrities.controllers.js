const Celebrity = require("../models/celebrity.model")

module.exports.create = (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs")
}

module.exports.doCreate = (req, res, next) => {
    
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase

    })
    .then(() => {
        res.redirect("/")
    })

}

module.exports.list = (req, res, next) => {

    Celebrity.find(req.query)
        
        .then(celebrities => {
            //console.log("Cele: ",celebrities)
            res.render("celebrities/celebrities", {celebrities})
        })
        .catch((err) => console.log(err))

}