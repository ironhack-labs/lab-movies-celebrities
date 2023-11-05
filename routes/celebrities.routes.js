const router = require("express").Router();

const errorHandling = require("../error-handling");
const Celebrity = require('./../models/Celebrity.model')

router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrity => res.render('celebrities/celebrities', { celebrity }))
        .catch(err => console.log('error on /celebrities rout', err))
})
router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})
router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase, photo } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase, photo })
        .then(() => res.redirect('/celebrities'))
        .catch(res.render('celebrities/new-celebrity'))
})


// 


module.exports = router;