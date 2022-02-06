const router = require("express").Router();
const { redirect } = require("express/lib/response");


const Celebrity = require('../models/Celebrity.model')

// Routes:


// Create a celebrity

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})
router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => {
            res.render('celebrities/new-celebrity')
            console.log(err)
        })
})

// List the celebrities

router.get('/', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))

})


// Celebrity details

router.get('/:id', (req, res) => {

    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrities => res.render('celebrities/celebrity-details', celebrities))
        .catch(err => console.log(err))
})

// Delete celebrities

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Celebrity
        .findByIdAndRemove(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

// Edit celebrities

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrities => res.render('celebrities/edit-celebrity', { celebrities }))
        .catch(err => console.log(err))
})





// HASTA AQUÍ BIEN

// ERROR
router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true })
        .then(updatedCelb => res.redirect(`/celebrities/${updatedCelb.id}`))
        .catch(err => console.log(err))
})

// NO LE LLEGA BIEN EL ID A LA RUTA, POR ESO EL FORMULARIO NO TERMINA DE COMPLETAR EL UPDATE





module.exports = router