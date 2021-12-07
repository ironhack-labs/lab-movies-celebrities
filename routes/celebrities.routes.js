const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

// Create
router.get('/celebrities/create', (req, res, next) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => {
            console.log('Erro while creating a new celebrity document: ', err);
            res.redirect('/celebrities/create');
        });
});

// Read
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => res.render('celebrities/celebrities', { celebrities: celebritiesFromDB }))
        .catch(err => next(err));
});

module.exports = router;