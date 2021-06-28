// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const celebrityModel = require('../models/Celebrity.model')


// all your routes here

router.get('/celebrities/create', (req,res, next) => {
    res.render('celebrities/new-celebrity.hbs')
})



router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    celebrityModel.create({name, occupation, catchPhrase})
    .then(() => {
        res.redirect('/celebrities')
    })
    .catch(() => {
        res.render('celebrities/new-celebrity.hbs')
    })   
})

router.get('/celebrities', (req,res, next) => {
    celebrityModel.find()
    .then((celebs) => {
        res.render('celebrities/celebrities.hbs', {celebs})
    })
    .catch(() => {
        next("Celebrities fetch failes")
    })

})



module.exports = router;
