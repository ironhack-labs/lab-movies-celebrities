const router = require("express").Router();
const Celeb = require('../models/Celebrity.model')


router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})
router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celeb
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.render('celebrities/new-celebrity'))
})
router.get('/celebrities', (req, res) => {
    Celeb
        .find()
        .then(celebs => res.render('celebrities/celebrities', { celebs }))
        .catch(err => console.log(err))
})

router.get('/celebrities/:id', (req, res) => {
    const { id } = req.params

    Celeb
        .findById(id)
        .then(celebs => res.render('celebrities/celebrity-detail', celebs))
        .catch(err => console.log(err))
})

router.post('/celebrities/:id/delete', (req, res) => {
    const { id } = req.params

    Celeb
        .findByIdAndDelete(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.get('/celebrities/:id/edit', (req, res) => {
    const { id } = req.params

    Celeb
        .findById(id)
        .then(celebs => res.render('celebrities/edit-celebrity', celebs))
        .catch(err => console.log(err))

})
router.post('/celebrities/:id/edit', (req, res) => {
    const { id } = req.params
    const { name, occupation, catchPhrase } = req.body

    Celeb
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))

})
module.exports = router;