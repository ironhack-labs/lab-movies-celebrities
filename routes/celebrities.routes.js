const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

//Add new celebrities
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchphrase } = req.body

    Celebrity
        .create({ name, occupation, catchphrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => res.render('celebrities/new-celebrity'))
})

//Display list of celebrities
router.get('/celebrities', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})

module.exports = router