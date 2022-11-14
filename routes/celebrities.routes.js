const express = require('express')
const router = express.Router()
const CelebrityModel = require('../models/Celebrity.model')
const MovieModel = require('../models/Movie.model')

//Find celebrities y render de la página
router.get('/', (req, res, next) => {
    CelebrityModel.find()
        .then((celebrity) => {
            res.render('celebrities/celebrities', { celebrity })
        })
        .catch((err) => next(err))
})

//celebrities creation y render de la página
router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    CelebrityModel.create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch((err) => next(err))
})



module.exports = router