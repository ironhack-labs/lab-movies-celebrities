// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const celebrityModel = require('../models/Celebrity.model');
const router = require("express").Router();

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebritie')
});

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    celebrityModel.create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch((err) => {
            res.render('celebrities/new-celebrity');

        })
})

router.get('/celebrities', (req, res, next) => {
    celebrityModel.find()
        .then((celebrities) => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch((err) => {
            console.error(err);

        })
})






module.exports = router;
