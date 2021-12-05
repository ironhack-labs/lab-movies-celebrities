// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get('/', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities });
        }).catch(error => {
            console.log("Error", error);
            res.render("error");
        });
});

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase, ...rest } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
        .then(celebrity => {
            console.log(celebrity);
            res.redirect("celebrities");
        }).catch(error => {
            console.log("Error", error);
            res.render("error");
        })

});



module.exports = router;