const router = require("express").Router()

// all your routes here

// require the model
const Celebrity = require('./../models/Celebrity.model')


// List Items
router.get('/celebrities', (req, res) => {

    Celebrity
        .find()
        .then((celebrity) => {
            const celebrities = { celebrityArr: celebrity }
            res.render('celebrities/celebrities', celebrities)
        })
        .catch(err => console.log(err))
})

// Item Details
router.get('/celebrities-details/:celebrity_id', (req, res) => {

    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebrityFromDB => {
            res.render('celebrities/celebrities-details', celebrityFromDB)
        })
        .catch(err => console.log(err))
})


// Create Item (Render)
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

// Create Item (Handle)
router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => {
            console.log(err)
            res.redirect('/celebrities/create')
        })
})


// Edit Item (Render)
router.get('/celebrities/:id/edit', (req, res) => {
    const { id } = req.params
    Celebrity
        .findById(id)
        .then(celebrity => {
            res.render('celebrities/edit-celebrity', celebrity)
        })
        .catch(err => console.log(err))
})

// Edit Item (Handle)
router.post('/celebrities/:id/edit', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    const { id } = req.params

    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => res.redirect(`/celebrities-details/${id}`))
        .catch(err => {
            console.log(err)
            res.redirect(`/celebrities/${id}/edit`)
        })
})

// Delete Item
router.post('/celebrities/:id/delete', (req, res) => {
    const { id } = req.params

    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

module.exports = router;