const Celebrity = require('../models/Celebrity.model')

const router = require('express').Router()

router.get('/', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')

})

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => res.render('celebrities/new-celebrity'))
})

router.get('/details/:celeb_id', (req, res, next) => {
    const { celeb_id } = req.params

    Celebrity
        .findById(celeb_id)
        .then(celebrity => res.render('celebrities/celebrity-details', celebrity))
        .catch(err => console.log(err))

})

router.post('/:celeb_id/delete', (req, res, next) => {
    const { celeb_id } = req.params
    Celebrity
        .findByIdAndDelete(celeb_id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.get('/:celeb_id/edit', (req, res, next) => {
    const { celeb_id } = req.params
    Celebrity
        .findById(celeb_id)
        .then(celebrity => res.render('celebrities/edit-celebrity', celebrity))
        .catch(err => console.log(err))


})

router.post('/:celeb_id/edit', (req, res, next) => {
    const { celeb_id } = req.params
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .findByIdAndUpdate(celeb_id, { name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})



module.exports = router