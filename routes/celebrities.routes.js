const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model');

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
  
    if (name.length === 0 || occupation.length === 0 || catchPhrase.length === 0) {
        res.render('celebrities/new-celebrity', { errorMsg: 'All fields must be completed' })
        return;
    }

    Celebrity
        .create({name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})

module.exports = router;
