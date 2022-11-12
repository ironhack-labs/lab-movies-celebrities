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

router.get('/celebrities/:id/edit', (req,res)=>{
    let id = req.params.id
    Celebrity.findById(id)
    .then ((celebrityInfo)=>{
        res.render('celebrities/celebrity-edit', {id, celebrityInfo})
    })
})

router.post('/celebrities/:id/edit', (req,res)=>{
    console.log(req.body)
    const { name, occupation, catchPhrase} = req.body
    Celebrity.findByIdAndUpdate(req.params.id, {name, occupation, catchPhrase}, {new: true})
    .then ((data)=>{
        data.save();
        res.redirect('edit')
    })
})


router.post('/celebrities/:id/delete', (req, res)=>{
    let id = req.params.id
    console.log(req.body)
    Celebrity.findByIdAndDelete(id)
    .then (()=>{
        res.redirect('/celebrities',)
    })
    
})

module.exports = router;