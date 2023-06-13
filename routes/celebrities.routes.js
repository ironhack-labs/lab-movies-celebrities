
const celebritiesRoutes = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

celebritiesRoutes.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
})

celebritiesRoutes.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
    .then(celebrityCreated => {
        console.log('created celebrity ', celebrityCreated);
        res.redirect('/celebrities');
    })
    .catch(error => {
        res.render('celebrities/new-celebrity');
    })
})

celebritiesRoutes.get('/', (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render('celebrities/celebrities', { celebrities });
    })
    .catch(error => next(error))

})



module.exports = celebritiesRoutes;