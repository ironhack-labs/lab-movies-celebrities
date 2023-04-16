// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get('/celebrities/create', (req, res, next) => res.render('celebrities/new-celebrity.hbs'));

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
    // .then(celebrityFromDB => console.log(`New celebrity created: ${celebrityFromDB.name}.`))
    .then(() => res.redirect('/celebrities'))
    .catch(error => next(error));
});

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(allTheCelebritiesFromDB => {
        console.log('Retrieved celebrities from DB:', allTheCelebritiesFromDB);
        res.render('celebrities/celebrities.hbs', { celebrities: allTheCelebritiesFromDB});
    })
    .catch(error => {
        console.log('Error while getting the celebrities from the DB: ', error);
        next(error);
    });
});

module.exports = router;