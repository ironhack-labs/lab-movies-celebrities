const router = require("express").Router();

// all your routes here
const Celebrity = require('./../models/Celebrity.model')


router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => {
            res.render("celebrities/celebrities", { celebrities })
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
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch(err => res.redirect("/celebrities/new-celebrity"))

})


//BONUS

router.get('/:id', (req, res) => {

    const { id } = req.params
    Celebrity
        .findById(id)
        .then(celebrity => {
            res.render("celebrities/celebrity-details", celebrity)
        })
        .catch(err => console.log(err))

})

router.post('/:id/delete', (req, res) => {

    const { id } = req.params
    Celebrity
        .findByIdAndRemove(id)
        .then(celebrity => {
            res.redirect("/celebrities")
        })
        .catch(err => console.log(err))

})

router.get('/:id/edit', (req, res) => {



    const { id } = req.params
    Celebrity
        .findById(id)
        .then(celebrity => {
            res.render('celebrities/edit-celebrity', celebrity)
        })
        .catch(err => console.log(err))




})

router.post('/:id/edit', (req, res) => {

    const { name, occupation, catchPhrase } = req.body
    const { id } = req.params

    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch(err => {
            res.redirect(`/celebrities/${id}`)
            console.log(err)
        })
})

module.exports = router;