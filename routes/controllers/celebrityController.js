const express = require("express");
const router = express.Router();
const Celebrity = require("../../models/Celebrity.model");

exports.list = (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render("celebrities/celebrity-list", { celebrities });
        })
        .catch((err) => {
            next(err);
        });
}

exports.detail = (req, res, next) => {
    const { id } = req.params;
    Celebrity
        .findById(id)
        .then((celebrity) => {
            res.render("celebrities/celebrity-details", celebrity);
        }
        )
        .catch((err) => {
            next(err);
        }
        );
}

exports.getCreateForm = (req, res, next) => {
    res.render("celebrities/new-celebrity");
}

exports.postCreateForm = (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect("/celebrities");
        })
        .catch((err) => {
            next(err);
        });
}


exports.getEditForm = (req, res, next) => {
    const { id } = req.params;
    Celebrity
        .findById(id)
        .then((celebrity) => {
            res.render("celebrities/celebrity-edit", celebrity);
        }
        )
        .catch((err) => {
            next(err);
        }
        );
}

exports.postEditForm = (req, res, next) => {
    const { id } = req.params;
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.findById(id)
        .then((celebrity) => {
            celebrity.name = name;
            celebrity.occupation = occupation;
            celebrity.catchPhrase = catchPhrase;
            celebrity.save()
                .then(() => {
                    res.redirect("/celebrities/celebrity-list");
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => {
            next(err);
        });
}


exports.delete = (req, res, next) => {
    const { id } = req.params;
    Celebrity.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/celebrities/celebrity-list");
        })
        .catch((err) => {
            next(err);
        });
}