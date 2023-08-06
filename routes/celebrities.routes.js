const express = require('express');
const router = express.Router();
const Celebrity = require('./../models/Celebrity.model')


router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => res.render('celebrities/new-celebrity', { error: 'Hubo un error al guardar la celebridad' }))
});

router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => next(err));
});



module.exports = router;
