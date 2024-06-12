const router = require("express").Router()
const Celebrity = require('./../models/Celebrity.model')

router.get('/', (req, res) => {
    Celebrity
        .find()
        //.then(all => res.send(all))
        .then(allCelebrities => res.render('celebrities/celebrities', { allCelebrities }))
        .catch(err => console.log("ERROR: ", err))

})
router.get('/create', (req, res) => {
    res.render("celebrities/new-celebrity")
})

router.post('/create', (req, res) => {
    //res.send(req.body)

    const { name, ocupation, catchPhrase } = req.body
    console.log(req.body)
    Celebrity
        .create({ name, ocupation, catchPhrase })
        .then(res.redirect('/celebrities'))
        .catch(err => console.log("ERROR: ", err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Celebrity
        .findById(id)
        .then(star => res.render('celebrities/celebrity-details', star))
        .catch(err => console.log("ERROR: ", err))
})
router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    Celebrity
        .findById(id)
        .then(star => res.render('celebrities/edit-celebrity', star))
        .catch(err => console.log("ERROR: ", err))
})
router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { name, ocupation, catchPhrase } = req.body
    Celebrity
        .findByIdAndUpdate(id, { name, ocupation, catchPhrase })
        .then(res.redirect(`/celebrities/${id}`))
        .catch(err => console.log("ERROR: ", err))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    Celebrity
        .findByIdAndDelete(id)
        .then(res.redirect('/celebrities'))
        .catch(err => console.log("ERROR: ", err))
})
module.exports = router