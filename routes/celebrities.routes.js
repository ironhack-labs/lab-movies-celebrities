const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities/create'))
        .catch(err => console.log(err))

})

router.get('/celebrities', (req, res, next) => {

    Celebrity
        .find()
        .then(cel => res.render('celebrities/celebrities', { cel }))
        .catch(err => console.log(err))

})


module.exports = router;