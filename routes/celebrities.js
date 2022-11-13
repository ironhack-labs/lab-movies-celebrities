const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))
});

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')

});

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    console.log(req.body)
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {

            res.redirect(`/celebrities`)
        })
        .catch(err => console.log(err))
})

router.get('/celebrities/celebrity-details/:celebrity_id', (req, res) => {

    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebrity => {
            res.render('celebrities/celebrity-details', celebrity)
        })
        .catch(err => console.log(err))
})

router.post('/celebrities/:celebrity_id/delete', (req, res, next) => {
    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndDelete(celebrity_id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
});

router.get('/celebrities/:celebrity_id/edit', (req, res, next) => {
    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebrity => {
            res.render('celebrities/edit-celebrity', celebrity)
        })
        .catch(err => console.log(err))
});

router.post('/celebrities/:celebrity_id/edit', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body
    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
        .then(() => res.redirect(`/celebrities`))
        .catch(err => console.log(err))
});







module.exports = router;
