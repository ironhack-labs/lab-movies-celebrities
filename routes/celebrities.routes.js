const router = require("express").Router();

// all your routes here

const CelebrityModel = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase, cast } = req.body

    CelebrityModel.create({ name, occupation, catchPhrase })
        .then((celebrity) => {
            res.redirect('/celebrities')
        })
        .catch((err) => {
            res.redirect('/celebrities/new-celebrity')
            next(err)
        })
})


router.get('/celebrities', (req, res, next) => {
    CelebrityModel
        .find()
        .then((Allcelebrites) => {
            res.render('celebrities/celebrities', { Allcelebrites })
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router;