const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})
router.post('/celebrities/create', (req, res, next) => {
    Celebrity.create(req.body)
        .then(() => res.redirect('/celebrities'))
        .catch((error) => res.render('celebrities/new-celebrity'))
})
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((celeArr) => res.render('celebrities/celebrities', {celeArr}))
        .catch((error) => next(error))
})



module.exports = router;