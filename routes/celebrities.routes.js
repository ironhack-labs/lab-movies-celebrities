const router = require("express").Router();

const { create } = require("hbs");


const Celebrities = require('../models/Celebrity.model')

//ITERATION #3 Adding new celebrities

router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity'))

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrities

        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch((err) => res.render('celebrities/new-celebrity'))

})

//ITERATION #4 Listing celebrities
router.get('/celebrities', (req, res) => {

    Celebrities
        .find()
        .then((celebrityList) => { res.render('celebrities/celebrities', { celebrityList }) })
        .catch(err => console.log(err))
});

module.exports = router;