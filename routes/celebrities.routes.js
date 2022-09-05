const router = require("express").Router();
const celebModel = require('../models/Celebrity.model')

router.get('/celebrities', (req, res, next) => {
    celebModel.find()
        .then((found) => {
            return found
        })
        .then((celebs) => res.render('../views/celebrities/celebrities', { celebs }))
        .catch((err) => next(err))
})

router.get('/celebrities/create', (req, res, next) => {
    res.render('../views/celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body
    celebModel.create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(() => res.render('../views/celebrities/new-celebrity'))
});



module.exports = router;