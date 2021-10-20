const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({name, occupation, catchPhrase})
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(() => {
            res.render('celebrities/new-celebrity')
        })
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((celebritiesFromDB) => {
            const data = {
                celebritiesList: celebritiesFromDB
            }
            res.render('celebrities/celebrities', data)
        })
        .catch((error) => {
            console.log('An error occured, could not load celebrities list', error);
            next(error);
        })
})

module.exports = router;