const router = require('express').Router()

const Celebrities = require('../models/Celebrity.model')


router.get('/create', (req, res) => {
    res.render('./celebrities/new-celebrities')
})
router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrities
        .create({ name, occupation, catchPhrase })
        .then(newCel => {
            res.redirect('/')
        })
        .catch(err => res.redirect('/celebrities/create'))
})
router.get('/', (req, res) => {
    Celebrities
        .find()
        .then(allCelebrities => {
            res.render('./celebrities/celebrities', { allCelebrities })
        })
        .catch(error => console.log(`no hay celbrities ${error}`))
})
module.exports = router


