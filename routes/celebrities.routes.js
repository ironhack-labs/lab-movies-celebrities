// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebritie = require("./../models/Celebrity.model")

// all your routes here

router.get('/', (req, res) => {
    
    Celebritie
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities.hbs', { celebrities })
        })
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity.hbs')
})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase} = req.body

    Celebritie
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect(`/celebrities`)
        })
        .catch(() => {
            console.log(err)
            res.render('celebrities/new-celebrity.hbs')
        })
})

router.get('/:id', (req, res) => {

    const { id } = req.params

    Celebritie
        .findById(id)
        .then(detCeleb => {
            res.render('celebrities/celebrity-details', detCeleb)
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Celebritie
        .findById(id)
        .then(editCeleb => {
            res.render("celebrities/edit-celebrity.hbs", editCeleb)
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    const { id } = req.params
    const { name, occupation, catchPhrase} = req.body

    Celebritie
        .findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true })
        .then(() => res.redirect("/celebrities"))
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Celebritie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})



module.exports = router;