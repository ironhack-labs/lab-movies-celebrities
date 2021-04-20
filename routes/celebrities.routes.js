const express = require('express')
const CelebrityModel = require('../models/celebrity.model')
const router = express.Router()

router.get('/celebrities', (req, res) => {
    CelebrityModel.find()
    .then((result) => {
        res.render('celebrities/celebrities', {data: result})
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {
    CelebrityModel.create(req.body)
    .then((result) => {
        console.log('Celebrity created')
        res.redirect('/celebrities')
    })
    .catch((err) => {
        console.log(err)
        res.render('celebrities/new-celebrity')
    })
})

module.exports = router;
