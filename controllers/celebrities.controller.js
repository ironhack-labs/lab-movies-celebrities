const Celebrity = require("../models/Celebrity.model");


module.exports.create =((req, res, next) => {
    res.render("celebrities/new-celebrity")
})

module.exports.doCreate =((req, res, next) => {
    Celebrity.create(req.body)
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch(() => {
            res.render("celebrities/new-celebrity")
        })
});

module.exports.list =((req, res, next) => {
    Celebrity.find()
    .then((celebrities) =>{
        res.render("celebrities/celebrities", { celebrities })
    })
    .catch(e => console.error(e))
})
