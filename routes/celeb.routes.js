// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Celeb = require('../models/Celeb.model')
const router = require('express').Router();
// all your routes here

router.get('/celebs/create', (req, res, next) => {
    res.render('celebs/new-celebs')
})

/*
router.post('/celebs/create', (req, res, next) => {
    console.log(req.body)
    const {name, occupation, catchPhrase} = req.body
    Celeb.create({name:name, occupation: occupation, catchPhrase: catchPhrase})
    .catch((err)=> {
        res.render('celebs/new-celebs')
        console.log('The error while creating is: ', err)
    })
    res.redirect('/celebs')
})
*/


module.exports = router;