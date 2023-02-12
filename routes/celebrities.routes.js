const router = require("express").Router();
const celebrity = require('./../models/Celebrity.model')

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => { res.render('celebrities/new-celebrity') })
})

router.get('/', (req, res) => {
    celebrity
        .find()
        .then(celebrity => res.render('celebrities/celebrities', { celebrity }))
        .catch(err => console.log(err))
})

module.exports = router;