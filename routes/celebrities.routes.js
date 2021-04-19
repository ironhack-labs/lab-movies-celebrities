const express = require("express")
const router = express.Router()

const Celebrity = require('../models/Celebrity.model')

/* CELEBRITIES */
router.get("/celebrities" , (req, res) => {
    Celebrity.find({})
    .then(result => {
        res.render('celebrities/celebrities', {celebrities: result})
    })
    .catch(error => {
        console.log(error)
    })   
})

router.get("/celebrities/new", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    Celebrity.create(req.body)
        .then(result => {
            res.redirect('/celebrities')
        })
        .catch(error => {
            res.render("celebrities/new-celebrity")
        })  
})

router.get('/celebrities/:_id', (req, res) => {
    Celebrity.findById(req.params._id)
        .then(result => {
            res.render('celebrities/celebrity-details', result)
        console.log(result)
        })
        .catch(error => {
            console.log(error)
        })
})

router.post('/celebrities/:_id/delete', (req, res) => {
    Celebrity.findByIdAndDelete(req.params._id)
        .then(result => {
            res.redirect('/celebrities')
        })
        .catch(error => {
            console.log(error)
        })
})

router.get('/celebrities/:_id/edit', (req, res) => {
    Celebrity.findById(req.params._id)
        .then(result => {
            res.render('celebrities/edit-celebrity', result)
        })
        .catch(error => {
            console.log(error)
        })
})

router.post('/celebrities/:_id', (req, res)=>{
    Celebrity.findByIdAndUpdate(req.params._id, req.body)
        .then(result => {
            res.redirect('/celebrities/'+result._id)
        })
        .catch(error => {
            console.log(error)
        })  
})

module.exports = router