const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();
// const Celebrity = require('Celebrity');




router.get('/celebrities', (req,res,next) =>{
    Celebrity.find()
    .then(celebrities =>{
        res.render('../views/celebrities/celebrities.hbs', {celebrities})
    }).catch(err =>console.log(err))
})

router.get('/celebrities/create', (req,res,next)=>{
    res.render('../views/celebrities/new-celebrity.hbs')
})

router.post('/celebrities/create', (req,res,next)=>{
    const {name, occupation, catchPhrase}=req.body
    Celebrity.create({
        name,
        occupation,
        catchPhrase
    })
    .then(()=>res.redirect('/celebrities'))
    .catch(err => {
        console.log(err),
        res.redirect('/celebrities/create')
    })
})
module.exports = router;