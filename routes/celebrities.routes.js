const router = require("express").Router();

const CelebrityModel = require('../models/Celebrity.model');

// all your routes here

router.get('/celebrities/create', (req, res, next) => {
    // Iteration #3: Add a new drone
    // ... your code here

    res.render('celebrities/new_celebrity');

});

router.post('/celebrities/create', (req, res, next) => {
    // Iteration #3: Add a new drone
    // ... your code here
    const { name, occupation, catchPhrase } = req.body
    CelebrityModel.create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch((err) => {
            res.render('celebrities/new_celebrity');
        });
});

router.get('/celebrities', (req, res, next) => {
    // Iteration #3: Add a new drone
    // ... your code here
    CelebrityModel.find()
        .then((celebrities) => {
            res.render('celebrities/celebrities', { celebrities });
        })
        .catch((err) => {
            console.error(err);
        });

});


module.exports = router;