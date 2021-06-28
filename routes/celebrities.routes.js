// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require('../models/Celebrity.model')

// all your routes here

//GET
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs')
});


//POST
router.post('/celebrities/create', (req,res, next) => {

    const {name, occupation, catchPhrase} = req.body

    CelebrityModel.create({name, occupation, catchPhrase})

        .then((celebrity)=> {
            res.render('celebrities/celebrities.hbs', {celebrity})
        })
        .catch(()=> {
            res.render('celebrities/new-celebrity.hbs')
        })

});

router.get('/celebrities', (req, res, next) => {
    
    CelebrityModel.find()
        .then((celebritiy)=> {
            res.render('celebrities/celebrities.hbs',{celebritiy})
        })
        .catch((err)=> {
            next(err)
        })
    
});







module.exports = router;