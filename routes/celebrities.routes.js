const router = require("express").Router()
const Celebrity = require('./../models/Celebrity.model')






router.get('/', (req, res) => {

    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.render('celebrities/new-celebrity'))
})

router.get('/details/:id', (req, res) => {

    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrities => {
            res.render('celebrities/celebrities-details', celebrities)
        })
        .catch(err => console.log(err))
})

router.post('/delete/:id', (req, res) => {

    const { id } = req.params

    Celebrity
        .findByIdAndRemove(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.get('/edit/:id', (req, res) => {
    const { id } = req.params
    Celebrity
        .findById(id)
        .then(celebrity => res.render('celebrities/edit-celebrity', celebrity))
        .catch(err => console.log(err))
})




router.post('/edit/:id', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    const { id } = req.params

    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => res.redirect(`/celebrities/details/${id}`))
        .catch(err => console.log(err))
})








module.exports = router
