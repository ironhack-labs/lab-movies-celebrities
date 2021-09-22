// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const e = require("express");
const { create } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model")
// all your routes here

router.get('/create', (req, res, next) => {

    console.log("entrando")
    res.render('celebrities/new-celebrity')
    
})

router.post('/create', (req, res, next) => {

    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({
        name, occupation, catchPhrase
    })
    .then((newCelebrity) => {
        console.log(newCelebrity)
        res.redirect("/celebrities")
    })
    .catch((error) => (res.render("celebrities/new-celebrity")))
})

router.get('/', (req, res, next) => {


    Celebrity.find({})
    .then((dbCelebs) => {
        res.render('celebrities/celebrities',{
            celebrityList: dbCelebs
        })
        
    })
    .catch(() => {console.log(e)})
})



module.exports = router;
