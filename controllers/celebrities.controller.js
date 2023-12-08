const Celebrity = require("../models/Celebrity.model");

module.exports.list = (req, res, next) => {

    Celebrity.find()
        .then((celebrities) => {
            res.render("celebrities/list", { celebrities })
        })
        .catch((err) => next(err));
};

module.exports.detail = (req, res, next) => {
    const id = req.params.id;

    Celebrity.findById(id)
        .populate("movies")
        .then((celebrity) => {
            res.render("celebrities/detail", { celebrity });
        })
        .catch((err) => next(err));
};

module.exports.create = (req, res, next) => {
    res.render("celebrities/create");
};

module.exports.doCreate = (req, res, next) => {
    Celebrity.create(req.body)
        .then((celebrity) => {
            res.redirect(`/celebrities/${celebrity._id}`);
        })
        .catch((err) => next(err));
};

module.exports.edit = (req, res, next) => {
    const id = req.params.id;

    Celebrity.findById(id)
        .then((celebrity) => {
            res.render("celebrities/edit", { celebrity });
        })
        .catch((err) => next(err));
};

module.exports.doEdit = (req, res, next) => {
    const id = req.params.id;

    Celebrity.findByIdAndUpdate(id, req.body, { new: true })
        .then((celebrity) => {
            res.redirect(`/celebrities/${celebrity._id}`);
        })
        .catch((err) => next(err));
};

module.exports.delete = (req, res, next) => {
    const id = req.params.id;

    Celebrity.findByIdAndDelete(id)
        .then((celebrity) => {
            res.send(celebrity);
        })
        .catch((err) => next(err));
};