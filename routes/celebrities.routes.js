// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

//MOSTRAR FORM PARA CREAR CELEBRITIES

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

// CREAR CELEBRITIES

router.post('/celebrities/create', (req, res, next) => {

    Celebrity.create(req.body)
    .then((celebrity) => {
        res.redirect('/celebrities')
        console.log(`The celebrity ${celebrity.name} has been created`)
    })
    .catch((err) => {
        console.error(err)
        res.render('celebrities/new-celebrity')
    })

})

// MOSTRAR LISTA DE CELEBRITIES

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((celebrity) => {
        res.render('celebrities/celebrities', { celebrity })
    })
    .catch((err) => {
        console.error(err)
    })
})

module.exports = router;