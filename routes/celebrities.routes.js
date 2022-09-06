const router = require('express').Router();
const celebModel = require('../models/Celebrity.model');

router.get('/celebrities', (req, res, next) => {
    celebModel
        .find()
        .then((celebrities) => {
            // console.log(celebsFromDB);
            res.render('celebrities/index', { celebrities });
        })
        .catch((err) => {
            next(err);
        });
});

// Create a new celebrity
router.get('/celebrities/new-celebrity', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/new-celebrity', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    const newCeleb = new celebModel({ name, occupation, catchPhrase });

    newCeleb
        .save()
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;