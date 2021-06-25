const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

module.exports.createCelebrity = (req, res, next) => {
    res.render('celebrities/new-celebrity')
};

module.exports.doCreateCelebrity = (req, res, next) => {
    Celebrity.create(req.body)
        .then((celebrity) => {
            res.redirect('/celebrities')
        })
        .catch((e) => res.render('celebrities/new-celebrity'))
};

module.exports.findCelebrity = (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render('celebrities/celebrities.hbs', {
                    celebrities
                })
        .catch((e) => res.render('celebrities/new-celebrity'))
        })
}

module.exports = router;