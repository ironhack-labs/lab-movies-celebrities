const router = require('express').Router()

const Celebrity = require('./../models/Celebrity.model')

router.get('/', (req, res) => {
    Celebrity
        .find()
        .then((celebrities) => {
            res.render('celebrities/celebrities.hbs', { celebrities: celebrities })
        })
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then((celebrity) => {
            res.redirect('/celebrities')
        })
        .catch(res.render('celebrities/new-celebrity'))
})

router.get('/:_id', (req, res) => {
    const { _id } = req.params
    Celebrity
        .findById(_id)
        .then((celebrity) => {
            res.render('celebrities/celebrity-details', celebrity)
        })
        .catch(err => console.log(err))
})

router.post('/:_id/delete', (req, res) => {
    const { _id } = req.params
    Celebrity
        .findByIdAndRemove(_id)
        .then((celebrity) => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})

router.get('/:_id/edit', (req, res) => {
    const { _id } = req.params
    Celebrity
        .findById(_id)
        .then((celebrity) => {
            res.render('celebrities/edit-celebrity', celebrity)
        })
        .catch(err => console.log(err))
})

router.post('/:_id/edit', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    const { _id } = req.params
    Celebrity
        .findByIdAndUpdate(_id, { name, occupation, catchPhrase })
        .then((celebrity) => {
            res.redirect(`/celebrities`)
        })
        .catch(err => console.log(err))
})

module.exports = router