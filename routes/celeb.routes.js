// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Celeb = require('../models/Celeb.model')
const router = require('express').Router();
// all your routes here

router.get('/celeb/create', (req, res, next) => {
    res.render('celebs/new-celebs')
})


router.post('/celeb/create', (req, res, next) => {
    console.log(req.body)
    const {name, occupation, catchPhrase} = req.body
    Celeb.create({name, occupation, catchPhrase})
    .then(()=> {
        res.redirect('/celebs')
    })
    .catch((err)=> {
        res.render('celebs/new-celebs')
        console.log('The error while creating is: ', err)
    })
})

router.get('/celebs', (req, res, next) => {
    Celeb.find()
    .then((result) => {
        console.log(result)
        res.render('celebs/celebs', {result})
    }) 
})

router.get('/celebs/:celebId', (req,res,next)=>{
    Celeb.findById(req.params.celebId)
    .then((result)=>{
        res.render('celebs/celeb-details', result)
    })
})



module.exports = router;