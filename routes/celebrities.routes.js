// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const celebritiesModel=require("../models/celebrity.model")

// all your routes here
router.get('/', (req, res) => {
    celebritiesModel.find()
    .then((dataFromDataBase) => {
        res.render('celebrities/celebrities.hbs', { celebrities: dataFromDataBase });
    })
    .catch((err) => {
        console.error(err);
    })
});
router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity.hbs')
});
router.post('/create', (req, res, next) => {
   const { name, occupation, catchPhrase } = req.body
    celebritiesModel.create({ name, occupation, catchPhrase })
    .then((doc) => {
        res.redirect(301, '/celebrities');
    })
    .catch((err) => {
        console.error(err);
        res.render('celebrities/new-celebrity.hbs')
    })
});

module.exports = router;