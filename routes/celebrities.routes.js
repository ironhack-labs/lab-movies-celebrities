const router = require("express").Router()
const Celebrity = require('../models/Celebrity.model');

router.get("/celebrities", (req, res) => {
    Celebrity
             .find()
             .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
             .catch(err => console.log(err))
})

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity') 
});

router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
             .create({ name, occupation, catchPhrase })
             .then(() => res.redirect('/celebrities'))
             .catch(err => console.log(err))
});


router.get('/celebrities/:id', (req, res) => {
    const { id } = req.params
    Celebrity
             .findById(id)
             .then(celebrities => res.render('celebrities/celebrity-details', celebrities))
             .catch(err => console.log(err))
})


router.post('/celebrities/:id/delete', (req, res) => {
    const { id } = req.params
    Celebrity
             .findByIdAndDelete(id)
             .then(() => res.redirect('/celebrities'))
             .catch(err => console.log(err))
});


router.get('/celebrities/:id/edit', (req, res) => {
    const { id } = req.params
    Celebrity
             .findById(id)
             .then(celebrities => res.render('celebrities/edit-celebrity', celebrities))
             .catch(err => console.log(err))
});

router.post('/celebrities/:id/edit', (req, res) => {
    const { id } = req.params
    const { name, occupation, catchPhrase } = req.body
    Celebrity
             .findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true })
             .then(() => res.redirect('/celebrities'))
             .catch(err => console.log(err))
});


module.exports = router