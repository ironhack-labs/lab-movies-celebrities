const express = require ('express')
const Celebritie = require('../models/Celebrity.model')
const router = express.Router()

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res, next)=>{
    const {name, occupation, catchPhrase} =req.body

    Celebritie
    .create({name, occupation, catchPhrase})
    .then(()=> res.redirect('/celebrities'))
    .catch(err => res.redirect('/create'))
})

router.get('/celebrities', (req, res, next) =>{
    Celebritie
    .find()
    .then(celebrities => res.render('celebrities/celebrities', {celebrities}))
    .catch(err=> console.log(err))
})

router.get ('/:id/edit', (req, res, next) =>{
    const _id= req.params

    Celebritie
    .findById(_id.id)
    .then(movie => res.render('celebrities/edit-celebritie', movie))
    .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res, next)=>{
    const _id= req.params
    const {name, occupation, catchPhrase} = req.body

    Celebritie
    .findByIdAndUpdate(_id.id, {name, occupation, catchPhrase})
    .then(updateCelebritie => res.redirect('/celebrities'))
    .catch(err => console.log(err))
})

router.get ('/:id', (req, res, next) => {
    const _id = req.params

    Celebritie
    .findById(_id.id)
    .then(celebritie => res.render('celebrities/celebritie-details', celebritie))
    .catch(err => console.log(err))

})

router.post ('/:id/delete', (req, res, next)=>{
    const _id = req.params

    Celebritie
    .findByIdAndDelete(_id.id)
    .then(()=> res.redirect('/'))
    .catch(err => console.log(err))
})




module.exports = router
