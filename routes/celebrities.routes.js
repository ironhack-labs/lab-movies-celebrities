const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model');



router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', async (req, res, next) => {
    try {
        const { celebrityName, celebrityOcupation, celebrityPhrase } = req.body
        await Celebrity.create({ name: celebrityName, occupation: celebrityOcupation, catchPhrase: celebrityPhrase })
        res.redirect('list')
    } catch (error) {
        next(error)
    }
})

router.get('/list', async (req, res, next) => {
    try {
        const listCelebrities = await Celebrity.find()
        res.render('celebrities/celebrities', { listCelebrities })
    } catch (error) {
        next(error)
    }
})

module.exports = router;