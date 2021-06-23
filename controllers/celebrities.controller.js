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

module.exports.detail = ((req, res, next) => {
    const { id } = req.params;
    Celebrity.findById(id)
        .then((celebrity) => {
            console.log(celebrity)
            res.render("celebrities/celebrity-details", celebrity )
        } )
})

module.exports.delete = ((req, res, next) => {
    const { id } = req.params;
    Celebrity.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch((e) => console.error(e))
});

module.exports.edit = ((req, res, next) => {
    const { id } = req.params
    Celebrity.findById(id)
        .then((celebrity) => {
            res.render("celebrities/edit-celebrity", celebrity)
        })
        .catch((e) => console.error(e))
})

module.exports.doEdit = ((req, res, next) => {
    Celebrity.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect(`/celebrities/${req.params.id}`))
        .catch(() => res.redirect(`/celebrities/${req.params.id}/edit`))
})