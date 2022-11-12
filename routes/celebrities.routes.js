// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
// all your routes here

router.post('/celebrities/create', (req, res)=>{
    console.log(req.body)
    Celebrity.create(req.body)
    res.redirect('/celebrities')
})

router.get('/celebrities', (req,res)=>{
    Celebrity.find()
    .then((celebritiesArray)=> {
        console.log(celebritiesArray)
        res.render('celebrities/celebrities', {celebritiesArray})
    })
})

router.get('/celebrities/create', (req, res)=>{
    res.render('celebrities/new-celebrity')
})


module.exports = router;