const express = require('express');
const router = express.Router();
const Celebrities = require('../models/Celebrity.model')
require('../db/index')


router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrities
        .create({ name, occupation, catchPhrase })
        .then(celebrities => res.redirect(`/celebrities`))
        .catch(err => console.log(err))
});
router.get('/celebrities', (req, res, next) => {

    Celebrities
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
});

router.post('/celebrities/:id/delete', (req, res) => {

    const { id } = req.params

    Movies
        .findByIdAndRemove(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})
module.exports = router;