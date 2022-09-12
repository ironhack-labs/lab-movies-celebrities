const Celebrity = require('../models/Celebrity.model')

const router = require('express').Router()

router.get('/celebreties-route', (req,res,next) => {
    res.send('celebrites-route')
})

router.get('/celebrities/create', (req,res,next) => {
    res.render('celebrities/new-celebrity.hbs')
})

router.post('/celebrities/create', (req,res,next) => {
    Celebrity.create(req.body)
    .then(celeb => {
        console.log(celeb)
        res.render('celebrities/celebrities.hbs', {
            celebArray: celeb
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/celebrities', (req,res,next) => {
    Celebrity.find()
    .then(celeb => {
        console.log(celeb)
        res.render('celebrities/celebrities.hbs', {
            celebArray: celeb
        })
    })
    .catch(err => {
        console.log(err)
        res.render('celebrities/celebrities.hbs', {
        })  
        })
})
module.exports = router