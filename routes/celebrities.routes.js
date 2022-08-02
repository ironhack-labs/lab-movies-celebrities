// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrities = require('../models/Celebrity.model.js')

// all your routes here

//Route to create and post new celebrities

router.get('/celebrities/create', (req, res, next)=>{
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next)=>{
    const {name, occupation, catchPhrase} = req.body;
    
    Celebrities.create({name, occupation, catchPhrase})
    .then((celebrity)=> {
        res.redirect('/celebrities')
    })
    .catch(err => {res.render('celebrities/new-celebrity')
    next(err);
})
})


router.get('/celebrities', (req, res, next)=>{
    Celebrities.find()
    .then((celebrity) => {
        res.render('celebrities/celebrities', {celebrity})
    })
    .catch(err => next(err));
})

module.exports = router;