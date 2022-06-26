const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {

    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.get('/celebrities', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrities => {
            //console.log(celebrities)
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))

})












module.exports = router;
