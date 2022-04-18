//SUPER IMPORTANTE el modelo y las rutas

const router = require("express").Router();
const Celebritie = require('../models/Celebrity.model')

//Mostras todas las Celebritie

router.get('/', (req, res) => {
    // res.send("holaa")
    Celebritie
        .find()
        .then(celebritie => {
            res.render('celebrities/celebrities', { celebritie })
        })
        .catch(err => console.log(err))
})
//Crear
//Necesita un get que tenga un formulario
//Cuidado con los name que tiene que ser los del modelo y el action /create con method POST

router.get('/create', (req, res) => {
    // res.send("hola")
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebritie
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect(`/celebrities`)
        })
        .catch(err => {
            console.log(err)
            res.render('celebrities/new-celebrity')
        })
})

//--------------------------
//BONUS

router.get('/:id', (req, res) => {
    // res.send("holaa")
    const { id } = req.params

    Celebritie
        .findById(id)
        .then(celebritie => {
            res.render('celebrities/celebrities-details', celebritie)
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
    // res.send("holaaaaa")
    const { id } = req.params

    Celebritie
        .findById(id)
        .then(celebritie => {
            res.render('celebrities/edit-celebrities', celebritie)
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
    // res.send("holaaaaa")
    const { id } = req.params
    const { name, occupation, catchPhrase } = req.body

    Celebritie
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => {
            res.redirect(`/celebrities`)
        })
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res) => {
    // res.send("holaaaaa")
    const { id } = req.params
    console.log(id)

    Celebritie
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))

})

module.exports = router;