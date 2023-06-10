const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
    
    newCelebrity.save()
    .then(() => {
        res.redirect('/celebrities');
    })
    .catch((error) => {
        res.render('celebrities/create', {error});
    });
});

router.get('/', (req, res, next) => {
    Celebrity.find()
        .then((celebritiesFromDB) => {
            res.render('celebrities/celebrities', {celebrities: celebritiesFromDB});
        })
        .catch((error) => {
            console.log("Error while getting the celebrities from the DB: ", error);
        });
});

module.exports = router;