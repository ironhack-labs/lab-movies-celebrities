const router = require("express").Router();
const Celebritie = require("./../models/Celebrity.model")

router.get('/celebrities', (req, res, next) => {
    Celebritie
        .find()
        .then(celebritie => res.render('celebrities/celebrities', { celebritie }))
        .catch(err => console.log(`el error es => ${err}`))
})

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebritie')
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    Celebritie
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(`el error es => ${err}`))
})

router.post('/celebrities/:id/delete', (req, res, next) => {
    const { id } = req.params
    Celebritie
        .findByIdAndDelete(id)
        .then(() => res.redirect("/celebrities"))
        .catch(err => console.log(`el error es => ${err}`))
})

router.get('/celebritie/:id/details', (req, res, next) => {
    const { id } = req.params
    Celebritie
        .findById(id)
        .then(celebritie => res.render("celebrities/celebrities-details", celebritie))
        .catch(err => console.log(`el error es => ${err}`))
})

router.get('/celebritie/:id/edit', (req, res, next) => {
    const { id } = req.params
    Celebritie
        .findById(id)
        .then(celebritie => res.render('celebrities/celebritie-edit', celebritie))
        .catch(err => console.log(`El erro es =>  ${err}`))
})

router.post('/celebritie/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { name, occupation, catchPhrase } = req.body
    Celebritie
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(`El error es => ${err}`))
})
module.exports = router