const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    res.render("celebrities/new-celebrity")
});

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({ name, occupation, catchPhrase })
        .then( () => {
                res.redirect('/celebrities')
        })
        .catch( () => {
            res.redirect('/new-celebrity')
        })
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then( (data) => {
            res.render('celebrities/celebrities', {celebArr: data})
        })
        .catch(err => {
            console.log(`An error has occured: ${err}`)
        })
})

module.exports = router;
