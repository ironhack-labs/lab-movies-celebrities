const Celebrity = require('../models/Celebrity.model');

module.exports.createCeleb = (req, res, next) => {
    res.render('celebrities/new-celebrity')
}

module.exports.doCreate = (req, res, next) => {
    Celebrity.create(req.body)
        .then((createdCeleb) => {
            console.log(createdCeleb);
            res.redirect("/celebrities/celebrities"); 
        })
        .catch((err) => {
            console.error("Error creating celebrity:", err);
            res.render('celebrities/new-celebrity');
        });
};

module.exports.listCeleb = (req, res, next) => {
    Celebrity.find()
    .then((celebs)=>{
        console.log(celebs)
        res.render('celebrities/celebrities', { celebs })
    })
    .catch(err => next(err));
}