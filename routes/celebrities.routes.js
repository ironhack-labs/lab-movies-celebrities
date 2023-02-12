const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect(`/celebrities`))
        .catch(err => {
            console.log(err)
            res.render('celebrities/new-celebrity')
        })
})

router.get('/celebrities', (req, res, next) => {

    Celebrity
        .find()
        .sort({ title: 1 })
        .then(celebrity => res.render('celebrities/celebrities', { celebrity }))
        .catch(err => console.log(err))
})

router.get('/celebrities/details/:celebrity_id', (req, res) => {

    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebrity => res.render('celebrities/celebrity-details', celebrity))
        .catch(err => console.log(err))
})

router.post('/celebrities/delete/:celebrity_id', (req, res) => {

    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndDelete(celebrity_id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.get('/celebrities/edit/:celebrity_id', (req, res) => {

    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebrity => res.render('celebrities/edit-celebrity', celebrity))
})

router.post('/celebrities/edit', (req, res) => {

    const { name, occupation, catchPhrase, celebrity_id } = req.body

    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
        .then(() => res.redirect(`/celebrities`))
        .catch(err => console.log(err))
})

module.exports = router;