const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')


router.get('/', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities.hbs', { celebrities }))
        .catch(err => console.log(err))
});


router.get('/create', (req, res) =>
    res.render('celebrities/new-celebrity'))

router.post('/create', (req, res, next) => {
    const { name, ocuppation, catchPhrase } = req.body

    Celebrity
        .create(req.body)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))


})



module.exports = router;