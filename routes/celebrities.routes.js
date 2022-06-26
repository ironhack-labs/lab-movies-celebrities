const router = require("express").Router()

const Celebrity = require('./../models/Celebrity.model')



router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => {

            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))
})


router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrities')
})

router.post('/create', (req, res) => {
    const { name, ocupation, catchPhrase } = req.body

    Celebrity
        .create({ name, ocupation, catchPhrase })
        .then(celebrity => res.redirect('/celebrities'))
        .catch(err => console.log('Error'))
})

module.exports = router