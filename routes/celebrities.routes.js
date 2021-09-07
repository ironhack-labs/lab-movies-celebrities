const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')


router.get('/celebrities/create', (req, res, next) => {
    res.render("celebrities/new-celebrity")
     });

router.post('/celebrities/create', (req, res) => {
    
    const { name, occupation, catchPhrase } = req.body;

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.render('celebrities/new-celebrity'));

});

router.get("/celebrities", (req, res) => {

    Celebrity
        .find()
        .then(allCelebritiesFromDB => {
            res.render("celebrities/celebrities.hbs", {celebrity: allCelebritiesFromDB})
        })
        .catch(error => {
            console.log('Error while getting the celebrities from the DB: ', error);
            next(error);
          });

});

module.exports = router;