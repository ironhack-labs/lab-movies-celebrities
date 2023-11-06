const router = require("express").Router()

const Celebrity = require('./../models/Celebrity.model')




router.get('/create', (req, res) => {
    Celebrity.populate
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {

    const { name, ocupation, catchPhrase } = req.body

    Celebrity
        .create({ name, ocupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.redirect('/new-celebrity'))
})


router.get('/celebrities', (req, res) => {

    Celebrity
        .find()
        .then(celebrity => res.render('celebrities/celebrities', { celebrity }))
        .catch(err => console.log(err))
})

router.post('/:_id/delete', (req, res) => {

    const { _id } = req.params

    Celebrity
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})


module.exports = router