const router = require("express").Router();
const CelebrityModel = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    CelebrityModel
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch(() => res.render('celebrities/new-celebrity'));
});

router.get('/celebrities', (req, res, next) => {
    CelebrityModel
        .find()
        .then((celebrities) => {
            res.render('celebrities/celebrities', { celebrities });
        })
        .catch((err) => next(err));
});

router.get('/celebrities/:id', (req, res, next) => {
    const { id } = req.params;
    CelebrityModel
        .findById(id)
        .then((movie) => {
            res.render('celebrities/celebrity-details', movie);
        })
        .catch((err) => next(err));
});

router.post('/celebrities/:id/delete', (req, res, next) => {
    const { id } = req.params;
    CelebrityModel
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch((err) => next(err));
});

router.get('/celebrities/:id/edit', (req, res, next) => {
    const { id } = req.params;
    CelebrityModel
        .findById(id)
        .then((celebrity) => {
            res.render('celebrities/edit-celebrity', celebrity);
        })
        .catch((err) => next(err));
});

router.post('/celebrities/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { name, occupation, catchPhrase } = req.body;

    CelebrityModel
        .findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true })
        .then(() => {
            res.redirect(`/celebrities/${id}`);
        })
        .catch((err) => next(err));
});

module.exports = router;