const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/create', (req, res, next) => {

    res.render('celebrities/new-celebrity')

})

router.post('/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch((err => {
            console.error(err)
            res.render('celebrities/new-celebrity', { error: err.message, form: req.body })
        }))
})

router.get('/', (req, res, next) => {
    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => next(err))
})

router.get('/:celebId', (req, res, next) => {
    const { celebId } = req.params

    Celebrity
        .findById(celebId)
        .then((celeb) => res.render('celebrities/celebrity-details', celeb))
        .catch(err => next(err))
})

router.get('/:celebId/edit', (req, res, next) => {
    const { celebId } = req.params

    Celebrity
        .findById(celebId)
        .then(celebrity => res.render('celebrities/celeb-edit', celebrity))
        .catch(err => next(err))
})

router.post('/:celebId/edit', (req, res, next) => {
    const { celebId } = req.params
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .findByIdAndUpdate(celebId, { name, occupation, catchPhrase }, { new: true })
        .then((updatedCeleb) => res.redirect(`/celebrities/${updatedCeleb._id}`))
        .catch(err => next(err))
})

router.post('/:celebId/delete', (req, res, next) => {
    const { celebId } = req.params
    Celebrity
        .findByIdAndDelete(celebId)
        .then(() => res.redirect('/celebrities'))
        .catch(err => next(err))
})

module.exports = router