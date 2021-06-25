const Celebrity = require('../models/Celebrity.model');


// Crear celebrity GET
module.exports.createCelebrity = (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs')
};

// Crear celebrity POST
module.exports.doCreateCelebrity = (req, res, next) => {
    Celebrity.create(req.body)
        .then((celebrity) => {
            res.redirect('/celebrities')
        })
        .catch((e) => res.render('celebrities/new-celebrity.hbs'))
};

// Buscar celebrities
module.exports.findCelebrity = (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render('celebrities/celebrities.hbs', {
                    celebrities
                })
        })
        .catch((e) => console.log((e)))
};